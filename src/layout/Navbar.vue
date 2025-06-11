<template>
  <div class="navbar-content">
    <div class="left">
      <button 
        class="sidebar-toggle" 
        @click="$emit('toggle-sidebar')"
        title="Toggle Sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <div class="breadcrumb">
        <h2 class="page-title">Panel de Administración</h2>
        <span class="page-subtitle">Sistema de Seguridad</span>
      </div>
    </div>
    
    <div class="center">
      <div class="search-container">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          placeholder="Buscar..." 
          class="search-input"
          v-model="searchQuery"
          @input="handleSearch"
        />
      </div>
    </div>

    <div class="right">
      <div class="notifications">
        <button class="notification-btn" title="Notificaciones">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span class="notification-badge">3</span>
        </button>
      </div>
      
      <div class="user-dropdown" @click="toggleDropdown" ref="dropdown">
  <div class="user-info">
    <div class="user-avatar">
      <img :src="userStore.user?.picture " alt="Foto" />
    </div>
    <div class="user-details">
<span>{{ userStore.user?.name || 'Invitado' }}</span>
      <span class="user-role">Administrador</span>
    </div>
    <svg class="dropdown-arrow" :class="{ 'rotated': dropdownOpen }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6,9 12,15 18,9"></polyline>
    </svg>
  </div>



        
        <div class="dropdown-menu" :class="{ 'open': dropdownOpen }">
          <a href="#" class="dropdown-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Perfil
          </a>
          <a href="#" class="dropdown-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Configuración
          </a>
          <div class="dropdown-divider"></div>
          <a href="/login" class="dropdown-item logout" @click.prevent="handleLogout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16,17 21,12 16,7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Cerrar Sesión
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from "../stores/user"

export default {
  emits: ['toggle-sidebar'],

  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const searchQuery = ref('')
    const dropdownOpen = ref(false)
    const dropdown = ref<HTMLElement | null>(null)

    const handleSearch = () => {
      console.log('Searching for:', searchQuery.value)
    }

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
        dropdownOpen.value = false
      }
    }

    const handleLogout = () => {
      userStore.clearUser()
      router.push('/login')
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      userStore.loadFromStorage() // Asegura que el usuario se cargue al montar
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      searchQuery,
      dropdownOpen,
      dropdown,
      userStore,
      handleSearch,
      toggleDropdown,
      handleLogout
    }
  }
}
</script>


<style scoped>
.navbar-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 72px;
  box-sizing: border-box;
}

.left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.sidebar-toggle {
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-toggle:hover {
  background: rgba(100, 116, 139, 0.1);
  color: #334155;
}

.breadcrumb {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: #1e293b;
  letter-spacing: -0.025em;
}

.page-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.center {
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  font-size: 0.875rem;
  color: #334155;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
  color: #94a3b8;
}

.right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notifications {
  position: relative;
}

.notification-btn {
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.notification-btn:hover {
  background: rgba(100, 116, 139, 0.1);
  color: #334155;
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 12px;
  min-width: 18px;
  text-align: center;
  line-height: 1;
}

.user-dropdown {
  position: relative;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.user-info:hover {
  background: rgba(100, 116, 139, 0.05);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e2e8f0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.user-role {
  font-size: 0.75rem;
  color: #64748b;
}

.dropdown-arrow {
  color: #94a3b8;
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 1000;
}

.dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #374151;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: 4px;
}

.dropdown-item:hover {
  background: #f8fafc;
  color: #1e293b;
}

.dropdown-item.logout {
  color: #ef4444;
}

.dropdown-item.logout:hover {
  background: rgba(239, 68, 68, 0.05);
  color: #dc2626;
}

.dropdown-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-content {
    padding: 0 1rem;
  }

  .center {
    display: none;
  }

  .page-subtitle {
    display: none;
  }

  .user-details {
    display: none;
  }
}

@media (max-width: 480px) {
  .left {
    gap: 0.5rem;
  }

  .page-title {
    font-size: 1.125rem;
  }
}
</style>