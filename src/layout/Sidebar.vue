<template>
  <div class="sidebar-container">
    <div class="sidebar-header">
      <div class="logo" :class="{ 'collapsed': collapsed }">
        <div class="logo-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <circle cx="12" cy="16" r="1"></circle>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <div class="logo-text" v-show="!collapsed">
          <h1>SECURITY</h1>
          <span>Panel Admin</span>
        </div>
      </div>
    </div>

    <nav class="navigation">
      <div class="nav-section">
        <h3 class="section-title" v-show="!collapsed">Principal</h3>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link 
              to="/" 
              exact-active-class="active"
              class="nav-link"
              :title="collapsed ? 'Inicio' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Inicio</span>
            </router-link>
          </li>
          
          <li class="nav-item">
            <router-link 
              to="/usuarios" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Usuarios' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Usuarios</span>
              <div class="nav-badge" v-show="!collapsed">12</div>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/dispositivos" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Dispositivos' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="M6 8h.01M10 8h.01M14 8h.01"></path>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Dispositivos</span>
              <div class="nav-badge success" v-show="!collapsed">8</div>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="nav-section">
        <h3 class="section-title" v-show="!collapsed">Seguridad</h3>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link 
              to="/roles" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Roles' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Roles</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/permisos" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Permisos' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Permisos</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/bitacora" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Bitácora' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Bitácora</span>
              <div class="nav-indicator" v-show="!collapsed"></div>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="user-status" v-show="!collapsed">
        <div class="status-indicator online"></div>
        <div class="status-text">
          <span>Sistema Activo</span>
          <small>Última sync: Hace 2 min</small>
        </div>
      </div>
      
      <button 
        class="collapse-btn"
        @click="$emit('toggle-sidebar')"
        :title="collapsed ? 'Expandir' : 'Contraer'"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-sidebar']
}
</script>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.5);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.logo.collapsed {
  justify-content: center;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

.logo-text h1 {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
  color: #f8fafc;
  letter-spacing: 1px;
}

.logo-text span {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.navigation {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.75rem 1.5rem;
  padding: 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 1.5rem;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  border-radius: 0;
}

.nav-link:hover {
  background: rgba(148, 163, 184, 0.1);
  color: #f1f5f9;
  transform: translateX(4px);
}

.nav-link.active {
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
  color: #60a5fa;
  border-right: 3px solid #3b82f6;
  font-weight: 600;
}

.nav-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #3b82f6 0%, #1e40af 100%);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
}

.nav-badge {
  background: #ef4444;
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  line-height: 1.2;
}

.nav-badge.success {
  background: #10b981;
}

.nav-indicator {
  width: 8px;
  height: 8px;
  background: #f59e0b;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.3);
}

.user-status {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  padding: 12px;
  background: rgba(148, 163, 184, 0.05);
  border-radius: 8px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-indicator.online {
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
  animation: pulse-status 2s infinite;
}

@keyframes pulse-status {
  0%, 100% {
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  }
}

.status-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.status-text span {
  font-size: 0.875rem;
  font-weight: 500;
  color: #e2e8f0;
}

.status-text small {
  font-size: 0.75rem;
  color: #94a3b8;
}

.collapse-btn {
  width: 100%;
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #94a3b8;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collapse-btn:hover {
  background: rgba(148, 163, 184, 0.2);
  color: #e2e8f0;
  border-color: rgba(148, 163, 184, 0.3);
}

/* Scrollbar personalizado */
.navigation::-webkit-scrollbar {
  width: 4px;
}

.navigation::-webkit-scrollbar-track {
  background: transparent;
}

.navigation::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 2px;
}

.navigation::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar-container {
    width: 280px;
  }
}
</style>