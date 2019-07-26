<template>
    <div v-if="items" class="wrapper">
        <dm-heading tag="h1" class="heading">Ships</dm-heading> 
        <dm-input type="search" v-model="search_ship" name="search"></dm-input>
        <table v-if="items.results.length" class="ships"> 
            <thead>
                <th>Name</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Cost in credits</th>
                <th>Length</th>
                <th>Max atmosphering speed</th>
            </thead> 
            <tr v-for="(ship, i) in items.results" :key="i" @click="getDetail(ship.url.split('/')[5])">
                <td>{{ship.name}}</td>
                <td>{{ship.model}}</td>
                <td>{{ship.manufacturer}}</td>
                <td>{{ship.cost_in_credits}}</td>
                <td>{{ship.length}}</td>
                <td>{{ship.max_atmosphering_speed}}</td>
            </tr>
        </table>
        <div v-else style="margin-top: 20px">Sorry, no ships found</div>
        <div class="pagination">
            <dm-icon name="chevron_left" size="40px" :class="{ 'disabled': !items.previous }" @click.native="prevShips()"></dm-icon>
            <dm-icon name="chevron_right" size="40px" :class="{ 'disabled': !items.next }" @click.native="nextShips()"></dm-icon>
        </div>
    </div>
</template>

<script>
import Detail from '@/views/Detail.vue'
export default {
    name: 'Ships',
    components: {
        Detail
    },
    data() {
        return {
            items: null,
            search: ''
        }
  },
  computed: {
      search_ship: {
          get(){
              return this.search;
          },
          set(ev){
              this.search = ev;
              let url = 'https://swapi.co/api/starships/?search='+ev;
              this.fetchShips(url);
              this.$router.push({name: 'Ships', query: {search: ev}})
              return;
            },
      }
  },
  async mounted(){
    let url = 'https://swapi.co/api/starships/'
    if(this.$route.query.search){
        url += '?search='+this.$route.query.search;
    }
    await this.fetchShips(url);  
  },
  methods: {
    fetchShips: function (request) {
      const myRequest = new Request(request)
      fetch(myRequest)
        .then((response) => { return response.json() })
        .then((data) => {
          this.items = data;
        }).catch( error => { console.log(error); });
    },
    prevShips(){
        if(this.items.previous){
            this.fetchShips(this.items.previous); 
        }
    },
    nextShips(){
        if(this.items.next){
            this.fetchShips(this.items.next); 
        }
    },
    getDetail(id){
        this.$router.push({name: 'ship_detail', params: {id: id}});
    }
  },
}
</script>
<style>
html, body {
    color: white;
    margin: 0;
    font-family: Heebo,"Helvetica Neue",Source Sans Pro,Helvetica,Arial,sans-serif;
    background-color: #1C2532;
    height: 100%;
    width: 100%;
}
.wrapper {
    width: 1200px;
    padding: 20px;
    margin: 0 auto;
    text-align: center;
}
.heading {
    padding: 10px 0 25px;
}
.ships td, th{
    padding: 10px;
    text-align: center;
}
.ships tr{
    cursor: pointer;
}
.ships tr:hover {
    color: #8EACC5;
}
.pagination {
    margin: 20px 0;
    text-align: center;
}
.pagination i {
    margin: 0 10px;
    cursor: pointer;
}
.pagination .disabled {
    color: #323E4F;
    cursor: auto;
}
</style>
