<template>
  <div class="wrapper"> 
    <dm-heading tag="h1" class="heading">Ship detail</dm-heading> 
    <table>
      <tr v-for="(item, i) in Object.keys(data)" :key="i">
        <td>{{ item.split('_').join(' ') }}</td>
        <td v-if="Array.isArray(data[item])">{{ data[item].join(', ') }}</td>
        <td v-else>{{ data[item] }}</td>
      </tr>
    </table>  
  </div>
</template>

<script>

export default {
  name: 'Detail',
  data() {
    return {
      data: {}
    }
  },
  async mounted(){
    let url = 'https://swapi.co/api/starships/'+this.$route.params.id;
    await this.fetchShip(url);  
  },
  methods: {
    fetchShip: function (request) {
      const myRequest = new Request(request)
      fetch(myRequest)
        .then((response) => { return response.json() })
        .then((data) => {
          this.data = data;
        }).catch( error => { console.log(error); });
    },
  }
}
</script>
<style scoped>
table {
  margin: 0 auto;
}
tr td:first-child {
  text-align: left;
  padding-right: 40px;
}

</style>
