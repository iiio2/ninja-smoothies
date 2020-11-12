<template>
    <div class="container">
        <router-link tag="button" to="/add-smoothie" class="btn btn-info">
            Add Smoothie
        </router-link>

        <div class="smoothies">
            <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-body">
                <button @click="deleteSmoothie(smoothie.id)" class="btn btn-danger btn-sm">X</button>
                <button @click="editSmoothie(smoothie)" class="btn btn-info btn-sm">@</button>
                <h4 class="card-title mt-4">{{ smoothie.title}}</h4>
                <ul>
                    <li :key="index" v-for="(ing, index) in smoothie.ingredients">{{ ing }}</li>
                </ul>
            </div>
        </div>
        </div>
        
    </div>
</template>

<script>
import db from '../firebase/init'; 

export default {
    data:function(){
        return {
            smoothies:[]
        }
    }, 
    methods:{
        deleteSmoothie(id){
        // delete doc from firestore
        db.collection('smoothies').doc(id).delete()
        .then(()=>{
            this.smoothies = this.smoothies.filter(smoothie=>{
                return smoothie.id != id; 
            })
        })
    }, 
        editSmoothie(smoothie){
            this.$router.push({name:'EditSmoothie', params:{smoothie_slug:smoothie.slug}}); 
        }
    }, 
    created(){
        // fetch data from firestore 
        db.collection('smoothies').get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var smoothie = doc.data(); 
                smoothie.id = doc.id; 
                this.smoothies.push(smoothie);  
            })
        })
    }
}

</script>


<style scoped>
    .smoothies{
        display:grid; 
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem; 
        margin-top: 1.2rem;
    }
    
</style>