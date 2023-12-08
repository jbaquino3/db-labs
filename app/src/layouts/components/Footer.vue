<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      John Israel Aquino
      <span class="d-none d-sm-inline">. All rights Reserved</span>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href="https://github.com/jbaquino3/db-labs"
        target="noopener noreferrer"
      >GitHub</a>
    </span>
  </div>
</template>
