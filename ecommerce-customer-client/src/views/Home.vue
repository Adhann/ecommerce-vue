<template>
  <div>
    <Navbar />
    <ContentHome />
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
import ContentHome from '../components/ContentHome'

export default {
  components: {
    Navbar,
    ContentHome
  }
}
</script>
