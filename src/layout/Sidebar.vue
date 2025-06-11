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
          <h1>SecureAccess</h1>
          <span>Gestión de usuarios</span>
        </div>
      </div>
    </div>

    <nav class="navigation">
      <div class="nav-section">
        <h3 class="section-title" v-show="!collapsed">Panel de Opciones</h3>
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
              to="/addresses" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Direcciones' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Direcciones</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/answer" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Respuestas' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Respuestas</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/device" 
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
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/digital-signature" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Firma Digital' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Firma Digital</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/password" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Contraseñas' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Contraseñas</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/permissions" 
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
              to="/profile" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Perfiles' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Perfiles</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/role" 
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
              to="/role-permission" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Roles y Permisos' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Roles y Permisos</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/security-question" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Preguntas de Seguridad' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Preguntas de Seguridad</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/session" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Sesiones' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h9l4-4"></path>
                  <path d="M3 10h18"></path>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Sesiones</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/users" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Usuarios' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <path d="M20 8v6M23 11h-6"></path>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Usuarios</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/user-role-list" 
              active-class="active"
              class="nav-link"
              :title="collapsed ? 'Usuarios y Roles' : ''"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span class="nav-text" v-show="!collapsed">Roles de Usuarios</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="sidebar-footer">
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

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.3);
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