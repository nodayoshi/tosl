<script setup>

import { useStore } from "vuex";
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  isReactive,
  computed,
  watchEffect,
  onMounted,
  withDefaults,
} from "vue";

let show = ref(false)
let artist_detail_index = ref(0)
let artists = reactive(
  [
    {
      text: '',
      bg: ''
    },
    {
      name: 'Ghost In The Tapes',
      sub_name: '(from London)',
      sns: '@ghostinthetapes',
      sns_link: 'https://www.instagram.com/ghostinthetapes/',
      text: 'Ghost In The Tapesは日仏人プロデューサー、ドラマーでラッパーのGenshu Fukayaとフランス・ナンシー出身のバンドM.ABeat!のバンドリーダー兼プロデューサーSamy Abboudにより2 0 1 7年に結成された。サンプルを駆使する伝統的なヒップホップの作曲プロセスに生楽器、アナログシンセサイザー、未来的なサウンドデザインや多ジャンルのプレイヤー、文化を取り込み、独自のサウンドを追求し続けている。デビュー作のHappilyConfusedは2020年にリリースされ、東京、ロンドン、ニューヨーク、フランスなど各国から多彩なゲストが参加している。',
      bg: '/images/ag_ghst.jpg',
      position: '50% 25%'
    },
    {
      name: '呂布カルマ',
      sub_name: '',
      sns: '@ryoff000karma',
      sns_link: 'https://www.instagram.com/ryoff000karma/',
      text: '名古屋天白JET CITY PEOPLE代表。プロラッパーでグラビアディガー。',
      bg: '/images/ag_ryohu.jpg',
      position: 'center'
    },
    {
      name: 'ALCI',
      sub_name: '(from Nikkeikyoudai)',
      sns: '',
      sns_link: '',
      text: '',
      bg: '',
      position: ''
    },
    {
      name: 'Auto&mst',
      sub_name: '(from Tokyo)',
      sns: '@autoandmst',
      sns_link: 'https://www.instagram.com/autoandmst/',
      text: 'BeatmakerのAutoとギタリストmstによるユニット。どんな環境でも旅先やキャンプの時の感覚にトリップさせてくれる、波のようなグルーブと空を仰ぐような解放感を電子音と生演奏で表現するChillhop Navigator現在までにSecaiとのSplit 12inch Vinyl ＆CD『Star Stalk』、12inch Vinyl&配信『HORIZON』、2020年に配信『sometime somewhere』をReleaseすると、Spotifyで100万回再生を突破し、バイヤーの目に留まりタワーレコード企画でCD化された。近年では『a little more』『Hang Loose』『Speakeasy』『Waterfall - With Words Ver.』などコラボレーションシングルを精力的に発表している。',
      bg: '/images/ag_automst.jpg',
      position: '50% 35%'
    },
    {
      name: 'TAIHEI',
      sub_name: '(Kalakuta)',
      sns: '@taihei0809',
      sns_link: 'https://www.instagram.com/taihei0809/#',
      text: '名古屋最深アンダーグラウンドKalakutaにて”BASQUIAT”をオーガナイズ。国内外アーティストのブッキングや共演を果たしながら、全国を回っている。Track Makerとしてアパレルショップや企業に楽曲やMIXを提供。2021年にHOLE AND HOLLANDからオリジナルトラック、Editなどリリースし自身初となる4曲EPのレコードをリリース。収録曲に東海を代表するラッパーCampanella、Alciを客演に入れた”Quando”は話題を呼んだ。2022にDJ KENSEIが監修、ディレクションする新レーベル「Sorameccer Sound Design」によるマンスリー・ミックス・テープ・プロジェクトの004番としてカセットMIXをリリース。2023年sabiから”Codona Dance”EEZEEから”Remisson”を リリース。',
      bg: "/images/ag_taihei.jpg",
      position: '50% 35%'
    }
  ]
)

import Instagram from '@/assets/i_instagram.svg?component'
const store = useStore();

function showArtist(i) {
  artist_detail_index.value = artist_detail_index.value != i ? i : 0;
}

const artist1 = ref()
const artist2 = ref()
const artist3 = ref()
const artist4 = ref()
const artist5 = ref()
const artist6 = ref()

function scrollElement(refName) {
  console.log('scrollElement', eval(refName).value)
  // if(window.scrollY >= 560) {

  //     window.scrollTo({
  //       top: 0,
  //     behavior:'smooth'
  //   })
  // }
}
onMounted(() => {
  const sections = document.querySelectorAll('section')
  const options = {
    threshold: 0.4
  }
  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        console.log(entry.target)
      }
    })
  }, options)
  sections.forEach(section => {
    observer.observe(section)
  })
})

</script>

<template>
  <article id="home">
    <section id="hero" class="box100 intersection">
      <div class="box_center p_2">
        <h2 class="lexend-exa top_title">TEMPLE OF SOUND NAGOYA</h2>
      </div>
    </section>
    <section id="schedule" class="box100 bg001 intersection">
      <div class="box_center">
        <!-- <p class="mincho pb_4">イギリスの教会をライブ会場としツアーを行ってきたGhost In The Tapes。日本ではお寺を舞台としライブを行う。それがTemple Of
          Sound。名古屋ゆかりのアーティストを迎え名古屋は真宗大谷派東別院にて開催！
        </p> -->
        <p class="align_center txtLLL">2023-9-18(月) 15:00-</p>
        <p>− 真宗大谷派名古屋別院(東別院)</p>
        <p class="pt_5 txtLLL"><span class="txtM">[夜市]:</span> 15:00-20:00</p>
        <p class="pt_05 txtLLL"><span class="txtM">[LIVE]:</span> 19:00-21:00</p>
      </div>
    </section>
    <section id="artists" class="bg_gy2">
      <div class="t_center py_3">
        <div v-for="(artist, i) in artists" :class="{ 'active': artist_detail_index == i }" :ref="'artist' + i"
          :key="'artist' + i">
          <h3 v-if="!!artist.name" class="color_bk bold v_center" @click="showArtist(i), scrollElement('artist' + i)">{{
            artist.name }}<span class="from">{{ artist.sub_name }}</span></h3>

          <aside class="artist_detail" @click="showArtist(0)" v-if="!!artist.text"
            :style="{ backgroundImage: 'url(' + artist.bg + ')', backgroundPosition: artist.position }">
            <div class="filter"></div>
            <a :href="artist.sns_link" target="_blank">
              <p class="color_wh">{{ artist.sns }}</p>
            </a>
            <p class="color_wh m_2 t_left">{{ artist.text }}</p>
          </aside>
        </div>
      </div>
    </section>
    <section id="footer" class="box50 bg_bk p_2">
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
  </article>
</template>

<style lang="scss">
section {
  &:not(.show) {
    opacity: 0;
  }

  &.show {
    animation: all-in 0.5s;
  }
}

@keyframes all-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.box100 {
  display: block;
  width: 100vw;
  min-height: 120vh;
  position: relative;
}

.box50 {
  display: block;
  width: 100vw;
  min-height: 50vh;
  position: relative;
}

.box_center {
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -45%);
  min-width: 100%;
  text-align: center;
}

.top_title {
  font-size: 4.2em;
}

.bg001 {
  min-height: 110vh;
  background-image: url('/images/bg001.jpg');
  background-size: cover;
  background-attachment: fixed;
}

.fit_center {
  text-align: center;
  top: 46%;
  position: relative;
}

.v_center {
  vertical-align: middle;
  align-items: center;
}

#artists {
  .artist_detail {
    transition: all .2s ease-in-out .4s;
    z-index: 100;
    display: block;
    background-repeat: no-repeat;
    background-size: cover;
    backdrop-filter: blur(2px);

    p,
    a {
      transition: all .4s ease-in-out;
    }
  }

  :not(.active) {
    .artist_detail {
      opacity: 0;
      height: 0;
      min-height: 1px;

      p,
      a {
        height: 0;
        display: none;
        transform: translateY(-20px);
      }
    }
  }

  .active {
    .artist_detail {
      opacity: 1;
      width: 100vw;
      height: 100vh;
      min-height: 800px;
      top: 0;
      padding: 5vh 0;

      .filter {
        position: absolute;
        z-index: -1;
        top: 0;
        background: rgb(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        min-height: 800px;
      }

      p,
      a {
        height: auto;
        display: inherit;
        transform: translateY(0px);
      }
    }
  }

  .from {
    margin-left: 0.7em;
  }
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
    margin-top: 5vh;
    grid-column: 1/ span 2;
  }

  .copyright {
    grid-column: 1/-1;
    justify-self: end;
    align-self: end;
    margin-top: 20vh;
  }
}


@include pc {
  #artists {

    h3,
    .from {
      transition: all .5s ease-in-out;
    }

    &:not(.active) {
      h3 {
        font-size: $txtXXL;
        transform: translateY(0px) scale(1);

        .from {
          font-size: $txtL;

        }
      }
    }

    .active {
      h3 {
        font-size: $txtXL;

        .from {
          font-size: $txtM;
        }
      }

      .artist_detail {
        background-attachment: fixed;
      }
    }
  }

  .footer-grid {
    .copyright {
      font-size: $txtSS;
    }
  }
}

@include smartphone {
  #artists {
    h3 {
      font-size: $txtL;

      .from {
        font-size: $txtM;
      }
    }

    .artist_detail {
      background-attachment: auto;
    }
  }

  .footer-grid {
    .copyright {
      font-size: $txtSSSS;
    }
  }
}
</style>