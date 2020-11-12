<template>
    <div class="container">
        <router-link tag="button" to="/" class="btn btn-info">
            Home
        </router-link>
        <h2 class="mt-3">Edit Smoothie </h2> 
        <p class="text-dark">Press 'tab' to include ingredients</p>
        <form @submit.prevent="editSmoothie">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" class="form-control" v-model.trim="smoothie.title" />
            </div>
           
            <div :key="index" v-for="(ing,index) in smoothie.ingredients">
                <label for="ingredient">Ingredient:</label>
                <input class="form-control" type="text" name="ingredient" v-model.trim="smoothie.ingredients[index]" />
                <p class="deleteIng" @click="deleteIng(ing)">X</p>
            </div>
            <div class="form-group">
                <label for="ingredients">Ingredients</label>
                <input type="text" name="ingredients" class="form-control" @keydown.tab.prevent="addIng" v-model.trim="ingredient" />
            </div>
            <p v-if="feedback">{{ feedback }}</p>
            <input type="submit" class="btn btn-success mb-5" value="Update Smoothie" :disabled="show" />
        </form>   
    </div>    
</template>

<script>

import db from "../firebase/init"; 
import slugify from "slugify"; 

export default {
    name:'EditSmoothie',
    data(){
        return {
            smoothie:'', 
            ingredient:'', 
            feedback:'',
            show:false, 
        }
    },
    created(){
        var ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug); 
        ref.get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.smoothie = doc.data(); 
                this.smoothie.id = doc.id; 
            })
        })
    }, 
    methods:{
        editSmoothie(){
            
            if(this.smoothie.title){
                this.feedback = '';
                this.show = true; 
              
                // create slug 
                this.smoothie.slug = slugify(this.smoothie.title,{
                    replacement:'-', 
                    remove: /[*+~.()'"!:@]/g, 
                    lower:true,
                });
                
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title:this.smoothie.title, 
                    ingredients : this.smoothie.ingredients, 
                    slug:this.smoothie.slug
                }).then(()=>{
                    this.$router.push({path:'/'});
                }).catch((err)=>{
                    console.log(err); 
                })

            }else{
                this.feedback = "You must add a title"; 
            } 
        },
        addIng(){
            if(this.ingredient){
                this.smoothie.ingredients.push(this.ingredient);
                this.ingredient = '';  
                this.feedback = '';  
            }else{
                this.feedback = "You must add ingredients"; 
            }
        }, 
        deleteIng(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient=>{
                return ingredient != ing; 
            })
        }    
    }
}
</script>

<style scoped>
    p{
        color:red; 
    }
    .deleteIng {
        display: inline;
        font-size: 1.4rem;
        font-weight: 700;
        cursor: pointer;
    }
</style>