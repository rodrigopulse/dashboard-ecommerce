<template>
  <header class="header">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">E-Commerce</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

          <b-nav-item-dropdown text="Produtos" left>
            <b-dropdown-item href="/produto/cadastra">Adicionar</b-dropdown-item>
            <b-dropdown-item href="#">Editar</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Categorias" left>
            <b-dropdown-item href="/categoria/cadastra">Adicionar</b-dropdown-item>
            <b-dropdown-item href="/categoria/gestao">Gestão</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Usuários" left>
            <b-dropdown-item href="#">Adicionar</b-dropdown-item>
            <b-dropdown-item href="#">Editar</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item href="#">Pedidos</b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
<style lang="scss" scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
</style>