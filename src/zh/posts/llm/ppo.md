---
author: 最后的开神-wkyc
icon: pen-to-square
date: 2023-06-28
category:
  - 语言模型
tag:
  - 模型
  - 强化学习
# sticky: 10
---

# PPO：从策略梯度算法到近端策略优化算法
PPO（Proximal Policy Optimization）是一种策略梯度优化算法，它对标准的策略梯度方法做了改进，使得训练更加稳定。PPO的主要思想是：在每个更新步骤中，我们要确保当前的策略参数不会偏离旧策略参数太远。
<!-- more -->

## 1 策略梯度算法
策略梯度算法带来了原始算法和总体框架，它告诉我们只要以奖励的期望式1.1为优化目标，通过采样足够多的样本来用均值估算数学期望，再用这个估算值对分布做梯度上升求式1.1的极大值，就可以优化我们所要优化的分布$\theta$。

$$
R_\theta=E_{\tau\sim{p_\theta(\tau)}}R(\tau)=\sum\limits_{\tau}[R(\tau)p_\theta(\tau)]
\tag {1.1}
$$

$$
\begin{aligned}
\nabla R_\theta
&=\sum\limits_{\tau}[R(\tau)\nabla p_\theta(\tau)] \\
&=\sum\limits_{\tau}[R(\tau)p_\theta(\tau)\nabla \log p_\theta(\tau)] \\
&=E_{\tau \sim p_\theta(\tau)}[R(\tau)\nabla \log p_\theta(\tau)] \\
&\approx \frac{1}{N}\sum\limits_{i=1}^{N}[R(\tau)\nabla \log p_\theta(\tau)]
\end{aligned}
\tag {1.2}
$$

$$
\theta\gets\theta+\eta\nabla{R_\theta}
\tag {1.3}
$$

但是策略梯度算法存在问题，每轮训练结束之后参数$\theta$都要更新，导致下一轮计算均值前仍要重新采样大量数据，训练的时间开销集中在了数据采样。

## 2 重要性采样
为了解决采样时间开销大的问题，引入了重要性采样，将式1.2换算成式2.1。这样我们可以对$\theta^\prime$采样一次之后，多次更新$\theta$，大大节省了训练中采样数据的时间开销。

$$
\begin{aligned}
\nabla R_\theta
&=E_{\tau \sim p_{\theta^\prime }(\tau)}[\frac{p_\theta(\tau)}{p_{\theta^\prime}(\tau)} R(\tau)\nabla \log p_\theta(\tau)] \\
&\approx \frac{1}{N}\sum\limits_{i=1}^{N}[\frac{p_\theta(\tau)}{p_{\theta^\prime}(\tau)}R(\tau)\nabla \log p_\theta(\tau)]
\end{aligned}
\tag {2.1}
$$

还原2.1式，得到我们的新的优化目标，如式2.2所示。

$$
R_\theta
=E_{\tau \sim p_{\theta^\prime }(\tau)}[\frac{p_\theta(\tau)}{p_{\theta^\prime}(\tau)} R(\tau)]
\tag {2.2}
$$

## 3 优势函数
式2.2的$R(\tau)$是累积奖励，我们要优化的$R_\theta$函数的实际意义是奖励关于完整路径$\tau$的数学期望，我们希望这个值正负参半，因为这样就可以衡量策略是好还是坏，而不是比较谁更好。定义$A(\tau)$等于$R(\tau)$减去一个与路径无关的基线函数，比如状态价值函数，是不影响等式的。最终我们的优化目标确定了，如式3.1所示。

$$
R_\theta
=E_{\tau \sim p_{\theta^\prime }(\tau)}[\frac{p_\theta(\tau)}{p_{\theta^\prime}(\tau)} A(\tau)]
\tag {3.1}
$$

总之，如果$A(\tau)$是正的，那就用梯度调整策略$\theta$增大$\tau$出现的概率；反之，如果$A(\tau)$是负的，那就用梯度调整策略$\theta$减小$\tau$出现的概率。

## 4 KL散度的外在约束
在加入重要性采样之后，我们可以对$\theta^\prime$采样来计算$\theta$的更新梯度了。在理想情况，即采样的次数足够多的情况下式1.2和式2.1是严格相等的，然而$\theta$和$\theta^\prime$的分布有差异会带来估算结果差异很大的问题，因此必须有一个约束。TRPO算法引入了KL散度，并将其作为一个外在约束。KL散度可以计算两个分布的不相似度，两个完全相同时，它们的KL散度值为0，不相似度越高，KL散度也越高。TRPO算法的公式如式4.1所示。

$$
\begin{cases}
R_\theta
=E_{\tau \sim p_{\theta^\prime }(\tau)}[\frac{p_\theta(\tau)}{p_{\theta^\prime}(\tau)} A(\tau)] \\
KL(\theta, \theta^\prime)< \delta
\end{cases}
\tag {4.1}
$$

但是TRPO算法也存在问题，因为它把 KL 散度约束当作一个额外的约束，没有放在目标里面，所以它处理起来非常困难。

## 5 KL惩罚
我们现在既需要一个KL散度来约束$\theta$和$\theta^\prime$分布的差异程度，又不能像TRPO算法那样将KL散度作为外在约束难以融入到梯度更新的操作中。因此考虑将KL散度加入到优化目标式3.1中，得到的新的优化目标如式5.1所示。

$$
R_\theta
=E_{\tau \sim p_{\theta^\prime }(\tau)}[\frac{p_\theta(\tau)}{p_{\theta^\prime}(\tau)} A(\tau)]-\beta KL(\theta,\theta^\prime)
\tag {5.1}
$$

我们的新优化目标和之前一样，也是越“大”，策略$\theta$就越“好”。这个式子前半部分的数学期望，是之前3.1式给出的，用来计量策略$\theta^\prime$采样的好坏程度，对我们来说，这个值越大越好；而后半部分，是一个超参数$\beta$乘以$\theta$和$\theta^\prime$的KL散度，用来计量$\theta$和$\theta^\prime$的不相似程度，对我们来说，这个值越小越好。用梯度上升来优化这个新的优化目标，就是PPO算法。

在这个基础上，还能对算法进一步改进，引入自适应KL惩罚（adaptive KL penalty），给出一个KL的可接受区间$[KL_{min},KL_{max}]$，当KL散度小于最小值时，说明$\theta$和$\theta^\prime$更新的幅度太小，即后面这一项效果太强了，应当减小$\beta$值；当KL散度大于最大值时，说明$\theta$和$\theta^\prime$的差距过大，即后面这一项效果太弱了，需要增大$\beta$值。

总之，KL惩罚的优势在于，新的优化目标既将原始的优化目标包含在内，又包含了一个描述$\theta$和$\theta^\prime$分布的不相似度的值，减小了对$\theta^\prime$采样来估算$\theta$的优化梯度的误差。

## 6 PPO裁剪（clip）

近端策略优化裁剪是解决$\theta$和$\theta^\prime$分布差异过大的另一种方法，它不使用KL散度来描述两种分布的不相似度，而是使用裁剪函数clip。近端策略优化裁剪的优化目标如式6.1所示。

$$
R_\theta
\approx 
\frac{1}{N}\sum\limits_{\tau}\min(
\frac{p_\theta(\tau)}{p_{\theta^\prime}(\tau)} A(\tau),
\rm{clip}(\frac{p_\theta(\tau)}{p_{\theta^\prime}(\tau)},1-\epsilon,1+\epsilon)A(\tau))
\tag {6.1}
$$

PPO裁剪实现的功能和KL惩罚一样，通过限定$\frac{p_\theta}{p_{\theta^\prime}}$的范围来约束$\theta$和$\theta^\prime$分布的差异程度。一般基于KL惩罚的PPO算法称为PPO1算法，基于clip的PPO算法称为PPO2算法。
