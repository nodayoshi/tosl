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

import { useParallax, useWindowSize, useWindowScroll } from '@vueuse/core'
//import { vScrollAnimationClass } from '@/directives/scrollAnimationClass';
const mainTarget = ref(null)
const parallax = reactive(useParallax(mainTarget))
const winSize = reactive(useWindowSize())
const scrollPos = reactive(useWindowScroll())
const layerBase = {
  position: 'absolute',
  transition: '.3s ease-out all',
}
const layer0 = computed(() => ({
  ...layerBase,
  textAlign: 'center',
  height: '100%',
  width: '100%',
  top: '9%',
  transform: `translateX(${parallax.tilt * 20}px) translateY(${((scrollPos.y / winSize.height) * 100)}px)`,
}))

// const layer1 = computed(() => ({
//   ...layerBase,
//   top: '55%',
//   opacity: '0.8',
//   width: "20%",
//   textAlign: "right",
//   transform: `translateX(${parallax.tilt * 30}px) translateY(${((scrollPos.y * -5 / winSize.height) * 100)}px) scale(1.33)`,
// }))

// const layer2 = computed(() => ({
//   ...layerBase,
//   top: '65%',
//   opacity: '0.8',
//   width: "80%",
//   textAlign: "right",
//   transform: `translateX(${parallax.tilt * 40}px) translateY(${((scrollPos.y * -7 / winSize.height) * 100)}px) scale(1.33)`,
// }))

// const layer3 = computed(() => ({
//   ...layerBase,
//   top: '45%',
//   opacity: '0.8',
//   transform: `translateX(${parallax.tilt * 50}px) translateY(${((scrollPos.y * -12 / winSize.height) * 100)}px) scale(1.33)`,
// }))

const store = useStore();

let artist_detail_index = ref(0)
let artists_detail = reactive(
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
      name: 'campanella',
      sub_name: '',
      sns: '@campanella_mdm',
      sns_link: 'https://www.instagram.com/campanella_mdm/',
      text: '1987年愛知県生まれ。C.O.S.A.とのユニットであるコサパネルラ名義の作品、フリーミックステープ『DETOX』CAMPANELLA&TOSHI MAMUSHI名義の作品『CAMPY&HEMPY』などを立て続けにリリース。2014年、ファースト・アルバム『vivid』をリリースし脚光を浴びる。2016年、セカンド・アルバム『PEASTA』をリリース。2017年、中納良恵(EGO-WRAPPIN’)とのコラボレーション楽曲『PELNOD』をシングルカット。2019年、坂本龍一の楽曲”ZURE”をサンプリングした楽曲『Douglas fir』をリリース。2020年、サード・アルバム『AMULUE』をリリース。2021年、7月に『Puedo feat. KID FRESINO』、2022年、4月に『RAGA feat. 鎮座DOPENESS』をシングルリリースした。2023年にはGuru Connectと共作した『Bell』がAppleのCMに起用されるなど、数多くのアーティストの楽曲に客演として参加、全国各地でライブを活発に行っている。',
      bg: '/images/ag_campanella.jpg',
      position: 'center'
    },
    {
      name: 'ALCI',
      sub_name: '(from Nikkeikyoudai)',
      sns: '',
      sns_link: '',
      text: '89年式 HIP HOP Player a.k.a 酔い吸いだおれHungry Monkey aka Viajante a.k.a Cantador de rua a.k.a 表現者 a.k.a 末っ子 a.k.a Beat Connection a.k.a 美濃加茂Rap道場 aka Rap Japinho',
      bg: '/images/ag_alci.jpg',
      position: 'center'
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
    },
    {
      name: 'Nanoha',
      sub_name: '',
      sns: '@play8h',
      sns_link: 'https://www.instagram.com/play8h/#',
      text: '愛知県出身22歳のシンガーソングライター2023年1月より本格的に活動を始め、現在5曲のシングルをデジタルリリース作詞作曲からMV、ジャケットのアートワークまで自身でプロデュースしている',
      bg: "/images/ag_nanoha.jpg",
      position: '50% 35%'
    }
  ]
)


function showArtist(i) {
  artist_detail_index.value = artist_detail_index.value != i ? i : 0;
  if (artist_detail_index.value != 0) {
    let activeElm = document.getElementsByClassName('artist' + i)
    console.log(activeElm)
    if (window.scrollY != activeElm[0].offsetTop) {
      window.scrollTo({
        top: activeElm[0].offsetTop,
        behavior: 'smooth'
      })
    }
  }
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
  <article id="home" ref="mainTarget">
    <section id="hero" ref="baseTarget" class="box100 show">
      <div class="layout-default_main" :style="layer0">
        <h2 class="lexend-exa top_title">TEMPLE<br>OF<br>SOUND</h2>
        <h2 class="mincho top_title2">東別院</h2>
      </div>
      <!-- <div class="layout-default_bg1" :style="layer1">
        <h2 class="lexend-exa lhm">JAZZ,<br>FUNK &<br>FUTURE<br>SOUND</h2>
      </div>
      <div class="layout-default_bg2" :style="layer2">
        <h2 class="lexend-exa lhm">& NIGHT<br>MARKET</h2>
      </div> -->
    </section>
    <section id="schedule" class="box100 bg001">
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
    <section id="artists" class="bg_gy2" ref="artists">
      <div class="t_center">
        <div v-for="(artist, i) in artists_detail" class="artist_name"
          :class="{ 'active': artist_detail_index == i, ['artist' + i]: i }" :key="'artist' + i"
          @mousedown="startDrag(item)">
          <h3 v-if="!!artist.name" class="color_bk bold v_center" @click="showArtist(i)">{{
            artist.name }}<span class="from">{{ artist.sub_name }}</span></h3>

          <aside class="artist_detail" @click="showArtist(0)" v-if="!!artist.text"
            :style="{ backgroundImage: 'url(' + artist.bg + ')', backgroundPosition: artist.position }">
            <a :href="artist.sns_link" target="_blank">
              <p class="color_wh">{{ artist.sns }}</p>
            </a>
            <p class="color_wh m_2 t_left">{{ artist.text }}</p>
          </aside>
        </div>
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

#hero {
  position: relative;
  display: block;
  background-image: url(/images/top.gif);
}

.layout-default {

  &_main {
    position: relative;
    height: 800px;
    z-index: 4;
    transition: scale(1.33);
  }

}

.box100 {
  display: block;
  width: 100vw;
  min-height: 120vh;
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
  font-size: 2.8em;
}

.top_title2 {
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
  .artist_name {
    position: relative;
    z-index: 100;
    cursor: pointer;
    overflow: hidden;

    &::before {
      transition: all .8s ease-in-out;
      content: "";
      position: absolute;
      width: 200%;
      height: 150%;
      display: block;
      background: linear-gradient(20deg, rgb(233, 255, 255), rgba(253, 219, 146, 1));
      top: 0;
      left: 200%;
      z-index: -1;
      transform: rotate(50deg);
    }

    &:hover {
      &::before {
        left: -25%;
        transform: rotate(52deg);
      }
    }
  }

  .artist_detail {
    transition: all .2s ease-in-out .4s;
    z-index: 100;
    display: block;
    background-repeat: no-repeat;
    background-size: cover;
    filter: grayscale(50%);


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

      &:before {
        position: absolute;
        top: 0;
        content: "";
        display: block;
        height: 100%;
        width: 100%;
        background: rgb(0, 0, 0, 0.2);
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

@include pc {

  #hero {
    background-size: cover;
    background-repeat: no-repeat;
    height: 2000px;
  }

  #artists {

    h3,
    .from {
      transition: all .5s ease-in-out;
    }

    &:not(.active) {
      h3 {
        font-size: $txtXXL;

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
        background-attachment: unset;
      }
    }
  }
}

@include smartphone {

  #hero {
    background-size: contain;
    background-repeat: no-repeat;
    height: 598px;
  }

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
}
</style>