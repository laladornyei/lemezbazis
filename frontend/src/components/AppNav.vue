<template>
    <nav class="navbar navbar-expand-lg menu">
        <div class="container">
            <img src="../logo.png" class="rounded float-left" alt="logo" width="216" 
     height="50">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav w-100">

                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Főmenü</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/eladas">Eladó lemezek</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/kozosseg">Közösség</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/feltoltes">Feltöltés</router-link>
                    </li>
                    <li class="nav-item dropdown ms-auto" style="float:right">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Profil
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link class="nav-link" to="/bejelentkezes">Bejelentkezés/Regisztrácó</router-link></li>
                            <li><router-link class="nav-link" to="/szerkesztes">Profil szerkesztése</router-link></li>
                            <li><router-link class="nav-link" to="/kivansag">Kívánságlista</router-link></li>
                            <li><router-link class="nav-link" to="/uzenetek">Üzenetek</router-link></li>
                            <div class="dropdown-divider"></div>
                            <li><a class="dropdown-item disabled" href="#">Kijelentkezés</a></li>

                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
   
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
</style>