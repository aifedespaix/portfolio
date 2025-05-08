<template>
  <div class="print-layout">
    <router-view />
  </div>
</template>

<style>
.print-layout {
  width: 210mm;
  height: 297mm;
  margin: auto;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

@media print {
  .print-layout {
    border: none !important;
    box-shadow: none !important;
  }

  body {
    margin: 0;
    -webkit-print-color-adjust: exact; /* Chrome : conserve les couleurs */
    print-color-adjust: exact;
  }
}

@page {
  size: A4 portrait;
}
</style>
