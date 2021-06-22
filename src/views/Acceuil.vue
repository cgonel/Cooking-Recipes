<template>
    <div>
        <h1>Nos meilleures recettes</h1>
        <div class="liste-recettes">
            <div v-for="recette in recettes" :key="recette.id" class="recette card">
                <router-link :to="{ name: 'Recette', params: {titre: recette.titre, id: recette.id}}" class="router-link">
                    <img :src="recette.image" :alt="recette.titre" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{recette.titre}}
                        </h5>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Acceuil",
    data(){
        return {
            recettes: []
        }
    },
    mounted(){
        // Récupère les recettes de l'API
        fetch("http://inter.ericgagne.net/api/synthese/recettes.json").then(resp =>{
            return resp.json()
        }).then(data => {
            this.recettes = data.recettes
        })
    }
}
</script>

<style scoped>
.liste-recettes {
    display: flex;
    justify-content: space-between;
}

h1 {
    margin: 20px 0px 40px 0px;
}

.card {
    margin: 0px 90px 40px 90px;
    background-color: #f2f2f2;
    overflow: hidden;
}

.card:hover {
    text-decoration: underline;
}


.card-img-top:hover {
    transform: scale(1.05);
}

.router-link {
    color: #2c3e50;
    text-decoration: none;
}
</style>