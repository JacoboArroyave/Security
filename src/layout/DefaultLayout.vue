<template>
  <div class="layout">
    <aside class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <Sidebar @toggle-sidebar="toggleSidebar" :collapsed="sidebarCollapsed" />
    </aside>
    <div class="main-content">
      <header class="navbar">
        <Navbar @toggle-sidebar="toggleSidebar" />
      </header>
      <main class="content">
        <div class="content-wrapper">
          <slot />
        </div>
      </main> 
    </div>
    <div class="mobile-overlay" :class="{ 'active': !sidebarCollapsed }" @click="closeSidebar"></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'

export default {
  components: { Sidebar, Navbar },
  setup() {
    const sidebarCollapsed = ref(false)

    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    const closeSidebar = () => {
      sidebarCollapsed.value = true
    }

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        sidebarCollapsed.value = true
      } else {
        sidebarCollapsed.value = false
      }
    }

    onMounted(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      sidebarCollapsed,
      toggleSidebar,
      closeSidebar
    }
  }
}
</script>

<style scoped>
.layout {
  display: block;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  overflow: hidden;
}

.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  box-shadow: 
    4px 0 24px rgba(15, 23, 42, 0.12),
    0 0 0 1px rgba(148, 163, 184, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  backdrop-filter: blur(10px);
}

.sidebar.collapsed {
  width: 80px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: transparent;
  margin-left: 280px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-content {
  margin-left: 280px;
}

.layout:has(.sidebar.collapsed) .main-content {
  margin-left: 80px;
}

.navbar {
  height: 72px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 50;
  transition: all 0.3s ease;
}

.content {
  flex: 1;
  overflow-y: auto;
  background: transparent;
  position: relative;
}

.content-wrapper {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 72px);
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
  .layout {
    display: flex;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    z-index: 100;
  }

  .sidebar.collapsed {
    width: 280px;
    transform: translateX(-100%);
  }

  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .mobile-overlay.active {
    display: block;
    opacity: 1;
    pointer-events: all;
  }

  .content-wrapper {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    height: 64px;
  }

  .content-wrapper {
    padding: 1rem;
    min-height: calc(100vh - 64px);
  }
}

/* Scrollbar personalizado */
.content::-webkit-scrollbar {
  width: 8px;
}

.content::-webkit-scrollbar-track {
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}

.content::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}
</style>