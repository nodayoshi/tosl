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
import firestore from "@/firebase/firestore/query";

const FS = new firestore()
const pages = ref(null)
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
  transform: `translateY(${((scrollPos.y / winSize.height) * -300)}px)`,
}))

const layer1 = computed(() => ({
  ...layerBase,
  transform: `translateY(${((scrollPos.y / winSize.height) * -170)}px)`,
}))

const layer2 = computed(() => ({
  ...layerBase,
  transform: `translateY(${((scrollPos.y / winSize.height) * 100)}px)`,
}))

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
    },
    {
      name: 'TSUBAKI fm NAGOYA presents',
      sub_name: '',
      sns: '@tsubaki.fm',
      sns_link: 'https://www.instagram.com/tsubaki.fm/#',
      text: 'インディペンデントミュージックを発信する新しい音楽プラットフォーム 「TSUBAKI FM」。世界中から集まるクオリティの高いアーティストやリスナーをキュレーションしながら日本のシーンに対して新しい風を送ります。様々なカルチャーや多彩な音楽、そしてライヴブロードキャストを中心に東京・京都・名古屋・広島・金沢など各都市から配信。今回の Temple of Sound では、TSUBAKI FM NAGOYAのメンバー AGO、MUSICMAN、Sammy the RIOT、S.O.N.E に Imaizumi を加えてのDJプレイを披露。',
      bg: "",
      position: 'center'
    },
    {
      name: 'UOU',
      sub_name: '- Lighting',
      sns: 'uoukzo.com',
      sns_link: 'https://www.uoukzo.com',
      text: 'UOU（ワオ）とは、英語で言う「WOW」と同じ意味を持つ同義語。目に入った瞬間にワオ！と驚いてもらえるような空間造りの意味を込めています。静的な美しさ・動的な躍動感を森の中エネルギッシュなダンスフロア屋内外でのビジュアル広告様々な催事で、多様な環境に応じて視覚空間を変化させ心踊るLive演出をしつらひ彩ります。',
      bg: "/images/ag_uou.jpg",
      position: 'center'
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

onMounted(async () => {
  const sections = document.querySelectorAll('section')
  const discriptions = document.querySelectorAll('p')
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
  //console.log(sections)
  sections.forEach(section => {
    //console.log(section)
    observer.observe(section)
  })

  //console.log(discriptions)
  discriptions.forEach(discription => {
    //console.log(discription)
    observer.observe(discription)
  })

  //firestoreから取得
  pages.value = await FS.setCollectionPath('pages').getAll().then((result) => result)
})

</script>

<template>
  <article id="home" ref="mainTarget">
    <section id="hero" ref="baseTarget" class="box100 show">
      <div class="layout-default_main">
        <h2 class="lexend-peta top_title" :style="layer0">TEMPLE<br>OF<br>SOUND</h2>
        <h2 class="mincho top_title2" :style="layer1">東別院</h2>
        <p class="discription t_left" :style="layer2" v-if="pages">{{ pages[0].discription }}</p>
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
        <p class="pt_5 txtLLL"><span class="txtM">[夜市]:</span> 16:00-21:00</p>
        <p class="pt_05 txtLLL"><span class="txtM">[LIVE]:</span> 17:00-21:00</p>
      </div>
    </section>
    <section id="artists" class="bg_gy2 show" ref="artists">
      <div class="t_center">
        <div v-for="(artist, i) in artists_detail" class="artist_name"
          :class="{ 'active': artist_detail_index == i, ['artist' + i]: i }" :key="'artist' + i"
          @mousedown="startDrag(item)">
          <h3 v-if="!!artist.name" class="color_bk bold v_center" @click="showArtist(i)">{{
            artist.name }}<br><span class="from">{{ artist.sub_name }}</span></h3>

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
    <section id="shops" class="gradient1 show">
      <h2 class="txtXXL mincho t_center">夜市<br><span class="txtSS mincho">-入場無料-</span></h2>
      <div class="food">
        <h3 class="txtLLL py_05 mincho">Food</h3>
        <div class="list">
          <h3>BAR<br><span>(ビール•酒類)</span></h3>
          <h3>mirume深緑茶房<br><span>(緑茶ドリンク)</span></h3>
          <h3>喫茶マスカラス＆クレープまるや<br><span>(カレー•クレープ)</span></h3>
          <h3>COFFEE,PLEASE & ICE CREAM<br><span>(コーヒー)</span></h3>
          <h3>Callejera STAND/GARAGE<br><span>(タコス)</span></h3>
          <h3>olive<br><span>(うどん)</span></h3>
          <h3>LAST<br><span>(クラフトビール)</span></h3>
          <h3>NIMROD COFFEE<br><span>(コーヒー)</span></h3>
          <h3>株式会社フードマリフ<br><span>(牛串•フランク)</span></h3>
          <h3>M＆M FOOD TRUCK<br><span>(カレー•フランク)</span></h3>
          <h3>想いっきり沖縄<br><span>(餃子•フランク•ポーク串•ドリンク)</span></h3>
          <h3>JIRRI<br><span>(牛串•ビビンバ•かき氷)</span></h3>
          <h3>J’s vendor nagoya<br><span>(チキンオーバーライス)</span></h3>
          <h3>Mr.POTATO<br><span>(ポテサラ•パニーニ•ポテトドック)</span></h3>
          <h3>フレイトレシピ<br><span>(柑橘ドリンク)</span></h3>
        </div>
      </div>

      <div class="goods">
        <h3 class="txtLLL py_05 mincho">Goods</h3>
        <div class="list">
          <h3>駄菓子屋nicco<br><span>(駄菓子)</span></h3>
          <h3>スペースたのしい<br><span>(玩具)</span></h3>
          <h3>サイゴン2<br><span>(仏具)</span></h3>
          <h3>牡丹〜dog dress〜<br><span>(犬用衣装)</span></h3>
          <h3>オリジナル腕輪念珠づくり<br><span>(WS)</span></h3>
          <h3>FRANKEN<br><span>(洋服)</span></h3>
          <h3>extraissue＆ball＆chain<br><span>(洋服)</span></h3>
          <h3>groovydays<br><span>(洋服)</span></h3>
          <h3>the chord<br><span>(靴磨き)</span></h3>
          <h3>opere<br><span>(家具)</span></h3>
          <h3>greatest hits<br><span>(レコード)</span></h3>
          <h3>roots lounge<br><span>(レコード)</span></h3>
          <h3>DAISY MESSENGER<br><span>(自転車)</span></h3>
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
  width: fit-content;
  display: block;
  position: absolute;
}

.top_title2 {
  width: fit-content;
  display: block;
  position: absolute;
}

.discription {
  width: '100%';

  &.show {
    opacity: 1;
    animation: all-in 0.5s;
  }
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

.gradient1 {
  background-color: #ffaa99;
  background-image:
    radial-gradient(at 72% 60%, hsla(18, 66%, 76%, 1) 0px, transparent 50%),
    radial-gradient(at 35% 69%, hsla(194, 76%, 75%, 1) 0px, transparent 50%),
    radial-gradient(at 96% 89%, hsla(2, 77%, 70%, 1) 0px, transparent 50%),
    radial-gradient(at 69% 91%, hsla(337, 86%, 63%, 1) 0px, transparent 50%);
}

#artists {
  padding: 3rem 0;

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

    h3 {
      line-height: 0.9;
      margin: 2rem 0;
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

#shops {
  padding: 4rem 0;
  display: grid;
  place-content: center;
  place-items: center;
  grid-gap: 2rem;
  grid-template-columns: 1fr;
  padding: 1rem;

  .list {
    h3 {
      font-size: 2.2rem;
      line-height: 1.2em;
      margin-bottom: 0.5em;

      span {
        font-size: 1rem;
      }
    }
  }

  .food,
  .goods {
    display: grid;
    place-content: center;
    place-items: center;
  }
}

@include pc {

  .top_title {
    top: 18%;
    left: 10%;
    font-size: 3.6em;
  }

  .top_title2 {
    top: 20%;
    left: 38%;
    writing-mode: vertical-rl;
    letter-spacing: 0.3em;
    font-size: 4.2em;
  }

  .discription {
    top: 53%;
    padding: 0 10vw;
    line-height: 2.2;
  }

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
        font-size: $txtXXXL;

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

  .top_title {
    top: 6%;
    left: 10%;
    font-size: 2.2em;
  }

  .top_title2 {
    top: 7.8%;
    right: 20%;
    writing-mode: vertical-rl;
    letter-spacing: 0.3em;
    font-size: 2.2em;
  }

  .discription {
    top: 25%;
    padding: 0 10vw;
    line-height: 1.8;
  }

  #hero {
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #000;
    height: 1000px;
  }

  #artists {

    h3 {
      font-size: $txtXL;

      .from {
        font-size: $txtM;
      }
    }

    .artist_detail {
      background-attachment: auto;
    }
  }

  #shops {
    font-size: smaller;
  }
}
</style>