<template>
    <div class="recette" v-if="recette != null">
        <h3>{{recette_titre}}</h3>
        <div class="recette-informations">
            <img :src="recette.image" :alt="recette.titre">
            <div class="infos">
                <a :href="recette.source">Lien original</a>

                <!-- les temps de la recette -->
                <p>
                    <strong>Préparation:</strong> {{recette.temps_preparation}} 
                </p>
                <p>
                    <strong>Cuisson:</strong> {{recette.temps_cuisson}}
                </p>
                <p v-if="recette.temps_attente != null">
                    <strong>Attente:</strong> {{recette.temps_attente}}
                </p>
                <p>
                    <strong>Total:</strong> {{total}}
                </p>

                <!-- "Se congèle" si vrai pour la recette -->
                <p v-if="recette.se_congele">
                    <strong>Se congèle</strong>
                </p>

                <!-- étoiles de la recette -->
                <div class="etoiles" >
                    <img v-for="n in recette.etoiles" :key="n" src="../assets/star.png" alt="étoile">
                </div>

                <!-- votes -->
                <div class="votes">
                    <p>
                        <strong>Nombre de votes:</strong>
                        {{nmb_votes}}
                    </p>
                    <button type="button" class="btn btn-success" @click="submit">J'aime cette recette!</button>
                </div>

                <!-- les ingrédients de la recette -->
                <p><strong>Ingrédients</strong></p>

                <ul> 
                    <li v-for="ingredient in recette.ingredients" :key="recette.ingredients.indexOf(ingredient)"> 
                        {{ingredient.texte}} 
                    </li>
                </ul>
            </div>
        </div>

        <!-- Étapes de préparation -->
        <div class="etapes-prep">
            <h5>Étapes de préparation</h5>
            <ol>
                <li v-for="etape in recette.preparation" :key="recette.preparation.indexOf(etape)">
                    {{etape}}
                </li>
            </ol>
        </div>

        <!-- Commentaires des utilisateurs -->
        <div class="commentaires">
            <h5>Commentaires des utilisateurs</h5>
            <div class="commentaire" v-for="commentaire in recette.commentaires" :key="recette.commentaires.indexOf(commentaire)">
                <h6> <strong>{{commentaire.utilisateur}}</strong> </h6>
                <p>{{commentaire.texte}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Recette",
    data() {
        return {
            recette_titre: this.$route.params.titre,
            recette_id: this.$route.params.id,
            recette: null,
            total: null,
            nmb_votes: null,
            categories: this.$route.params.categories,
            categories_name: null,
        }
    },
    methods: {
        // Fonction de conversion du paramètre aux unités appropriées
        conversionTemps(temps){
            if (temps < 60 && temps != null){
                temps = temps + "m"
            } else if (temps >= 60 ){
                let h = Math.trunc(temps / 60) + "h"
                if ((temps % 60) != 0){
                    temps = h + (temps % 60) + "m"
                } else {
                    temps = h
                }
            }
            return temps
        },
        submit(){
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify({
                    id: this.recette.id
                })
            }

            fetch("http://inter.ericgagne.net/api/synthese/votes/vote.php", requestOptions)
        }
    },
    mounted(){
        fetch("http://inter.ericgagne.net/api/synthese/recettes.json").then(resp =>{
            return resp.json()
        }).then(data => {
            for(let d of data.recettes){
                // Récupère seulement la recette choisie
                if(d.id == this.recette_id){
                    // Conversion du temps total 
                    this.total = d.temps_preparation + d.temps_cuisson + d.temps_attente

                    this.total = this.conversionTemps(this.total)


                    // Conversion des autres temps de la recette
                    d.temps_preparation = this.conversionTemps(d.temps_preparation)

                    d.temps_cuisson = this.conversionTemps(d.temps_cuisson)

                    d.temps_attente = this.conversionTemps(d.temps_attente)
                    
                    this.recette = d
                }
            }
        })

        // Appel à l'API pour récupérer les nmb de votes de la recette
        fetch("http://inter.ericgagne.net/api/synthese/votes/vote.php").then(resp=>{
            return resp.json()
        }).then(data =>{
            this.nmb_votes = data.data[this.recette_id]
        })
    }
}
</script>

<style scoped>
.recette {
    text-align: left;
}

.recette h3 {
    font-weight: bold;
    margin: 20px 20px;
}

.recette-informations {
    display: flex;
    margin-bottom: 40px;
    padding-left: 20px;
}

.infos {
    margin-left: 20px;
}

.infos p {
    margin: 5px 0px 0px 0px;
}

.etoiles {
    display: flex;
    margin: 10px 0px;
}

.etoiles img {
    width: 20px;
    height: 20px;
}

.votes button {
    margin: 10px 0px;
}

.etapes-prep {
    background-color: #DCDCDC;
    padding: 40px 20px;
}

h5 {
    font-weight: bold;
    margin-bottom: 20px;
}

.commentaires {
    padding: 40px 20px;
}
</style>