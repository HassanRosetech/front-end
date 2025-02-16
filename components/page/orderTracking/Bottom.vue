<template>
  <div class="col-12 overflow-visible">
    <div class="tracker-table">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr class="table-head">
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Discription</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in tableData" :key="'data' + index">
              <td>
                <p>{{ data.date }}</p>
              </td>
              <td>
                <p>{{ data.time }}</p>
              </td>
              <td>
                <p class="fw-bold">{{ data.shipping }}</p>
              </td>
              <td>
                <p>{{ data.address }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '21/05/2021',
          time: '12:21 AM',
          shipping: 'Shipped Info',
          address: '3 SW. Summit St. Lithonia, GA 30038'
        },
        {
          date: '15/04/2021',
          time: '01:00 PM',
          shipping: 'Shipped',
          address: '70 Rockwell Lane Falls Church, VA 22041'
        },
        {
          date: '04/05/2021',
          time: '03:58 AM',
          shipping: 'Shipped Info Received',
          address: '13 Durham St. The Villages, FL 32162'
        },
        {
          date: '30/04/2021',
          time: '06:26 PM',
          shipping: 'Origin Scan',
          address: '38 Saxon Lane Mobile, AL 36605'
        },
        {
          date: '02/02/2021',
          time: '3:45 PM',
          shipping: 'Shipped Info Received',
          address: '3 Willow Street Chillicothe, OH 45601'
        },
        {
          date: '14/01/2021',
          time: '12:21 AM',
          shipping: 'Shipped',
          address: '35 Brickyard Rd. Marshalltown, IA 50158'
        },
      ]
    }
  }
};
</script>