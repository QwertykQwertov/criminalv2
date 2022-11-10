<template>
     <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Footer Content</h5>
                <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2022 Copyright Text
            </div>
          </div>
        </footer>
</template>
<script>

export default {
    name: 'Footer',
}
</script>

<style scoped  src="materialize-css/dist/css/materialize.min.css">

</style>
<style scoped>
/* @import "materialize-css/dist/css/materialize.min.css"; */

.page-footer{    
  background: linear-gradient(to right, #50381a, #141111) !important;
}
.page-footer .footer-copyright{
    background-color: rgb(41 32 22) !important;
}
</style>