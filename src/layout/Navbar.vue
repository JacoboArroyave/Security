<template>
  <nav class="navbar-container">
    <button @click="$emit('toggle-sidebar')" class="menu-btn" aria-label="Toggle sidebar">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <h1 class="navbar-title">Panel de Administración</h1>
    <div class="navbar-actions">
      <slot name="actions" />
    </div>
  </nav>
</template>

<script setup lang="ts">
// No se requiere lógica adicional, se usa slot para contenido extra
</script>

<style scoped>
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 1.5rem;
  background: transparent;
  color: #1e293b;
  font-weight: 500;
  width: 100%;
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #1e293b;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background 0.2s ease;
}

.menu-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.icon {
  width: 24px;
  height: 24px;
}

.navbar-title {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
