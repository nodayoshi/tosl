<script setup>
import Instagram from '@/assets/i_instagram.svg?component'
import {
  ref,
  onMounted
} from "vue";
let show = ref(false)

const initialize = () => {
  show.value = true
};

onMounted(() => {
  setTimeout(() => {
    initialize()
  }, 2000)
})
</script>

<template>
  <section id="footer" class="box50 bg_bk pt_4 pb_2 px_2" v-if="show" :class="{ 'show': show }">
    <div class="footer-grid">
      <span class="sns">
        <a href="https://www.instagram.com/temple_of_sound_nagoya/" target="_blank">
          <Instagram class="i_instagram" />
        </a>
      </span>
      <!-- <span class="txtSS  color_gy3 menu">
          CONTACT
        </span> -->
      <span class="color_gy3 copyright">
        Copyright © TEMPLE OF SOUND NAGOYA. All rights reserved
      </span>
    </div>
  </section>
</template >

<style lang="scss">
.box50 {
  display: block;
  width: 100vw;
  position: relative;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(35px, auto);
  grid-gap: 3px;

  .sns {
    grid-column: 5;
    justify-self: end;
  }

  .menu {
    margin-top: 1vh;
    grid-column: 1/ span 2;
  }

  .copyright {
    grid-column: 1/-1;
    justify-self: end;
    align-self: end;
    margin-top: 5vh;
  }
}

@include pc {
  .footer-grid {
    .copyright {
      font-size: $txtSS;
    }
  }
}

@include smartphone {
  .footer-grid {
    .copyright {
      font-size: $txtSSSS;
    }
  }
}
</style>