export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-df8b6e0c","v-6e19edb7","v-f0ec4556","v-24b7c48d","v-2bc6566a","v-7f25ca3a","v-7d70f19b","v-7bbc18fc","v-7a07405d","v-6cd750ef","v-6b227850","v-696d9fb1","v-67b8c712","v-184f4da6","v-2e3eac9e","v-1473bf53","v-4e65ec78","v-c151bf32","v-438ffe52"]},"/zh/":{"path":"/zh/article/","keys":["v-56a32aab","v-62ced1a6","v-46587e86","v-3fbd497c","v-9ef49308","v-4edd03ab","v-4d282b0c","v-4b73526d","v-49be79ce","v-738aa55e","v-71d5ccbf","v-7020f420","v-6e6c1b81","v-858cfdd6","v-269ae70f","v-2b64e284","v-c1942916","v-65c00218","v-36295574"]}},"star":{"/":{"path":"/star/","keys":["v-7bbc18fc","v-df8b6e0c","v-696d9fb1","v-6e19edb7"]},"/zh/":{"path":"/zh/star/","keys":["v-4b73526d","v-56a32aab","v-7020f420","v-62ced1a6"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-df8b6e0c","v-f0ec4556","v-24b7c48d","v-2bc6566a","v-7f25ca3a","v-7d70f19b","v-7bbc18fc","v-7a07405d","v-6cd750ef","v-6b227850","v-696d9fb1","v-67b8c712","v-6e19edb7"]},"/zh/":{"path":"/zh/timeline/","keys":["v-56a32aab","v-46587e86","v-3fbd497c","v-9ef49308","v-4edd03ab","v-4d282b0c","v-4b73526d","v-49be79ce","v-738aa55e","v-71d5ccbf","v-7020f420","v-6e6c1b81","v-62ced1a6"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

