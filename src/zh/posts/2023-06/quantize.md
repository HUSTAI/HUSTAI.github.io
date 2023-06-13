---
author: 韦开意臣
icon: pen-to-square
date: 2023-06-13
category:
  - transformer
tag:
  - 优化
  - 字节
# star: 10
# editLink: false # 禁用编辑功能
sticky: 10
---
# int8量化
## 1.1 公式解析
基准：普通的Linear层：y=Wx+b
x：tensor([1., 2., 3., 4.], device='cuda:0')

W：tensor([[ 0.4753,  0.4548, -0.2720,  0.0310],
                   [-0.3591, -0.4820, -0.3717, -0.2604]], device='cuda:0',requires_grad=True)
                   
b：tensor([-0.4314,  0.1237], device='cuda:0', requires_grad=True)

y：tensor([ 0.2612, -3.3559], device='cuda:0', grad_fn=<AddBackward0>)

* 令W=TW'，其中T是一个对角矩阵，相当于W'的每行乘以一个系数。

* 选定T保证W'的每一行四舍五入到整型之后最大值为127或者最小值为-127即可，因此T完全由W决定。

T的对角元素：tensor([0.0037, 0.0038], device='cuda:0', dtype=torch.float16)
  
W'：tensor([[ 127,  122,  -73,    8],
                    [ -95, -127,  -98,  -69]], device='cuda:0', dtype=torch.int8)
  
b：tensor([-0.4314,  0.1237], device='cuda:0', dtype=torch.float16)

* 前向传播的计算公式变成了y=TW'x+b。

* 量化操作仅针对W，不针对b。量化之后，网络相当于舍弃了W，而保留了W'和T。W'由于变成了int8整型，因此对显存来说相当于多存了T的对角元素，少存了W的一半大小，总体上显存的压力是大大变小了。
  
y：tensor([ 0.2571, -3.3652], device='cuda:0', dtype=torch.float16)

## 1.2 非对称量化
以上描述的过程是对称量化，对称量化把每一行的绝对值的最大值变换到127，而非对称量化是把每一行的最大值变换到127，最小值变换到-128，因此非对称量化的W'=TW-p，除了多一个T的对角元素之外还多一个偏移向量。
