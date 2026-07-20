<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="navbar">
      <div class="navbar-brand">

        <span class="brand-text">COFFEE QUALITY<br />CHALLENGE</span>
      </div>
      <nav class="navbar-links">
        <RouterLink to="/" class="nav-link" active-class="active" exact-active-class="active">
          Home
        </RouterLink>
        <RouterLink to="/avaliacoes" class="nav-link" active-class="active">
          Avaliações
        </RouterLink>
        <RouterLink to="/ranking" class="nav-link" active-class="active">
          Ranking
        </RouterLink>
      </nav>
    </header>

    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app-shell {
  min-height: 100vh;
  background: #f7f1ea;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 0.9rem 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  color: #4a2c17;
  font-size: 0.85rem;
  line-height: 1.1;
  letter-spacing: 0.02em;
}

.navbar-links {
  display: flex;
  gap: 2.2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: #8a7565;
  font-weight: 500;
  font-size: 0.95rem;
  padding-bottom: 0.35rem;
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.nav-link:hover {
  color: #6b4423;
}

.nav-link.active {
  color: #6b4423;
  border-bottom-color: #6b4423;
  font-weight: 600;
}

.app-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}
</style>
