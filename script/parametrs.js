export const parametrs = {
  canvas: {
    width : 600,
    height : 435,
  },
  content: {
    nikName : `<input id='username' type='text' class='name_inp' placeholder='you nikname'>
              <p id='errorInput' class='error'></p>
              <input id='email' type="email" name="email" required class='last_name_inp' placeholder='you e-mail'>
              <button id='enter' class='btn_subm'>enter</button>
              <button id='reg' class='btn_subm'>registration</button>`,
    menuGame : `<button id='about' class='btn_menu'>about</button>
                <button id='controls' class='btn_menu'>controls</button>
                <button id='scores' class='btn_menu'>scores</button>
                <button id='start' class='btn_menu'>start game</button>`,
    about : `<p class='paragraf'>ABOUT</p>
             <p class='about'>You task is to destroy all opponents</p>
             <p class='about'>if you will hit opponents of bullets - you will take 100 points<br>
             if you will hit opponents of grenades - you will take 200 points
             </p>
             <p class='about'>Good luck, soldier</p>
            <button class='menuGame'>menu</button>`,
    controls : `<p class='paragraf'>controls</p>
               <p class='control'><i class="fas fa-arrow-right"></i> - move right</p>
               <p class='control'><i class="fas fa-arrow-left"></i> - move back</p>
               <p class='control'><i class="fas fa-arrow-down"></i> - to sit down</p>
               <p class='control'><i class="fas fa-arrow-up"></i> - to throw grenade</p>
               <p class='control'>SPACE - to fire</p>
               <button class='menuGame'>menu</button>`,
    scores : `<table>
                <caption>SCORES</caption>
                <tr>
                  <th>NAME</th>
                  <th>SCORE</th>
                </tr>`,
    again : `<button id='again' class='again'>menu</button>`,            
  },  
  linkImage : {
    fonModalStart : "./img/metal_slug.png",
    bots : "./img/bots.png",
    hero : "./img/hero.png",
  },   
  hero : {
    duration : {
      fire : 300,
      sitDown : 300,
      throw : 300,
      death : 300,
      run : 300,
      back : 300,
      boom : 1000,
    },
    run : [
        {x:0 ,y:70 ,w:85 ,h:67 },
        {x:86 ,y:70 ,w:85 ,h:67 },
        {x:173 ,y:70 ,w:85 ,h:67 },
        {x:260 ,y:70 ,w:85 ,h:67 },
        {x:343 ,y:70 ,w:85 ,h:67 },
        {x:426 ,y:70 ,w:85 ,h:67 },
        {x:0 ,y:149 ,w:85 ,h:67 },
        {x:85 ,y:149 ,w:85 ,h:67 },
        {x:170 ,y:149 ,w:85 ,h:67 },
        {x:256 ,y:149 ,w:85 ,h:67 }
    ],
    stop : {x:0 ,y:323 ,w:85 ,h:67 },
    bullet : {x:513, y:1497, w:8, h:8, x1:90, y1:358},
    back : [
        {x:0 ,y:232 ,w:85 ,h:67 },
        {x:85 ,y:232 ,w:85 ,h:67 },
        {x:170 ,y:232 ,w:85 ,h:67 },
        {x:255 ,y:232 ,w:85 ,h:67 },
        {x:340 ,y:232 ,w:85 ,h:67 },
        {x:425 ,y:232 ,w:85 ,h:67 },
    ],
    throw : [
        {x:0 ,y:1141 ,w:80 ,h:67 },
        {x:81 ,y:1141 ,w:80 ,h:67 },
        {x:162 ,y:1141 ,w:80 ,h:67 },
        {x:243 ,y:1141 ,w:80 ,h:67 },
        {x:324 ,y:1141 ,w:80 ,h:67 },
        {x:0 ,y:1212 ,w:89 ,h:67 },
        {x:90 ,y:1212 ,w:89 ,h:67 },
    ],
    fire : [
        {x:0 ,y:582 ,w:128 ,h:67 },
        {x:128 ,y:582 ,w:132 ,h:67 },
        {x:259 ,y:582 ,w:128 ,h:67 },
        {x:407 ,y:582 ,w:132 ,h:67 },
        {x:0 ,y:658 ,w:122 ,h:67 },
        {x:124 ,y:658 ,w:135 ,h:67 },
        {x:256 ,y:658 ,w:122 ,h:67 },
        {x:380 ,y:658 ,w:135 ,h:67 },
        {x:0 ,y:323 ,w:85 ,h:67 },
    ],
    sitDown : [
        {x:0 ,y:1398 ,w:85 ,h:67 },
        {x:85 ,y:1398 ,w:85 ,h:67 },
        {x:170 ,y:1398 ,w:85 ,h:67 },
    ],
    death : [
        {x:0 ,y:1326 ,w:88 ,h:67 },
        {x:89 ,y:1326 ,w:87 ,h:67 },
        {x:174 ,y:1326 ,w:86 ,h:67 },
        {x:259 ,y:1326 ,w:85 ,h:67 },
        {x:344 ,y:1326 ,w:85 ,h:67 },
        {x:428 ,y:1326 ,w:85 ,h:67 },
        {x:0 ,y:1398 ,w:85 ,h:67 },
        {x:85 ,y:1398 ,w:85 ,h:67 },
        {x:170 ,y:1398 ,w:85 ,h:67 },
        {x:255 ,y:1398 ,w:85 ,h:67 },
        {x:339 ,y:1398 ,w:85 ,h:67 }
    ],
    boom : [
      {x:15 ,y:1702 ,w:68 ,h:155 },
      {x:103 ,y:1702 ,w:68 ,h:155 },
      {x:191 ,y:1702 ,w:68 ,h:155 },
      {x:279 ,y:1702 ,w:68 ,h:155 },
      {x:367 ,y:1702 ,w:68 ,h:155 },
      {x:455 ,y:1702 ,w:68 ,h:155 },

      {x:15 ,y:1867 ,w:68 ,h:155 },
      {x:103 ,y:1867 ,w:68 ,h:155 },
      {x:191 ,y:1867 ,w:68 ,h:155 },
      {x:279 ,y:1867 ,w:68 ,h:155 },
      {x:367 ,y:1867 ,w:68 ,h:155 },
      {x:455 ,y:1867 ,w:68 ,h:155 },

      {x:15 ,y:2032 ,w:68 ,h:155 },
      {x:103 ,y:2032 ,w:68 ,h:155 },
      {x:191 ,y:2032 ,w:68 ,h:155 },
      {x:279 ,y:2032 ,w:68 ,h:155 },
      {x:367 ,y:2032 ,w:68 ,h:155 },
      {x:455 ,y:2032 ,w:68 ,h:155 },

      {x:15 ,y:2197 ,w:68 ,h:155 },
      {x:103 ,y:2197 ,w:68 ,h:155 },
      {x:191 ,y:2197 ,w:68 ,h:155 },
      {x:279 ,y:2197 ,w:68 ,h:155 },
      {x:367 ,y:2197 ,w:68 ,h:155 },
      {x:455 ,y:2197 ,w:68 ,h:155 },

      {x:15 ,y:2362 ,w:68 ,h:155 },
      {x:103 ,y:2362 ,w:68 ,h:155 },
      {x:191 ,y:2362 ,w:68 ,h:155 },
      {x:279 ,y:2362 ,w:68 ,h:155 },
      {x:367 ,y:2362 ,w:68 ,h:155 },
      {x:455 ,y:2362 ,w:68 ,h:155 },
      {x:0 ,y:1481 ,w:12 ,h:21 }
    ],
  }, 
  grenade : {
    duration : 1500,
    clear : {x:0 ,y:1481 ,w:12 ,h:21 },
    frames : [
        {x:0 ,y:1677 ,w:10 ,h:21 },
        {x:14 ,y:1677 ,w:12 ,h:21 },
        {x:29 ,y:1677 ,w:13 ,h:21 },
        {x:44 ,y:1677 ,w:16 ,h:21 },
        {x:61 ,y:1677 ,w:18 ,h:21 },
        {x:81 ,y:1677 ,w:19 ,h:21 },
        {x:102 ,y:1677 ,w:20 ,h:21 },
        {x:124 ,y:1677 ,w:20 ,h:21 },
        {x:147 ,y:1677 ,w:19 ,h:21 },
        {x:168 ,y:1677 ,w:20 ,h:21 },
        {x:190 ,y:1677 ,w:19 ,h:21 },
        {x:211 ,y:1677 ,w:18 ,h:21 },
        {x:232 ,y:1677 ,w:17 ,h:21 },
        {x:251 ,y:1677 ,w:16 ,h:21 },
        {x:269 ,y:1677 ,w:14 ,h:21 },
        {x:285 ,y:1677 ,w:12 ,h:21 },
    ],
    linkage : {x:20, y:325},
  },
  bot : {
    widthWrap : 96,
    heightWrap : 67,
    duration : {
      run : 2000,
      bullet : 500,
      die : 1000,
    },
    run : [
      // бег
      {x:314, y:193, w:22, h:45,x1:45, y1:17,},
      {x:353, y:193, w:21, h:45,x1:44, y1:17,},
      {x:391, y:193, w:21, h:45,x1:44, y1:17,},
      {x:427, y:193, w:23, h:45,x1:46, y1:17,},
      {x:463, y:193, w:25, h:45,x1:48, y1:17,},
      {x:503, y:193, w:22, h:45,x1:45, y1:17,},
      {x:538, y:193, w:19, h:45,x1:45, y1:17,},
      {x:573, y:193, w:20, h:45,x1:45, y1:17,},
      {x:609, y:193, w:20, h:45,x1:45, y1:17,},
      {x:645, y:193, w:23, h:45,x1:45, y1:17,},
      {x:687, y:193, w:26, h:45,x1:45, y1:17,},
      {x:730, y:193, w:24, h:45,x1:45, y1:17,},
      // достает орудие
      {x:378, y:370, w:24, h:45,x1:40, y1:17,},
      {x:409, y:370, w:24, h:45,x1:40, y1:17,},
      {x:440, y:370, w:25, h:45,x1:39, y1:17,},
      {x:472, y:370, w:31, h:45,x1:33, y1:17,},
      {x:508, y:370, w:35, h:45,x1:29, y1:17,},
      {x:548, y:370, w:37, h:45,x1:27, y1:17,},
      {x:591, y:370, w:46, h:45,x1:18, y1:17,},
      {x:641, y:370, w:42, h:45,x1:22, y1:17,},
      // стреляет
      {x:323, y:462, w:39, h:45,x1:25, y1:17,},
      {x:372, y:462, w:61, h:45,x1:3, y1:17,},
      {x:441, y:462, w:59, h:45,x1:5, y1:17,},
      {x:515, y:462, w:59, h:45,x1:5, y1:17,},
      {x:584, y:462, w:60, h:45,x1:4, y1:17,},
      {x:323, y:462, w:39, h:45,x1:25, y1:17,},
      // прячет орудие
      {x:641, y:370, w:42, h:45,x1:22, y1:17,},
      {x:591, y:370, w:46, h:45,x1:18, y1:17,},
      {x:548, y:370, w:37, h:45,x1:27, y1:17,},
      {x:508, y:370, w:35, h:45,x1:29, y1:17,},
      {x:472, y:370, w:31, h:45,x1:33, y1:17,},
      {x:440, y:370, w:25, h:45,x1:39, y1:17,},
      {x:409, y:370, w:24, h:45,x1:40, y1:17,},
      {x:378, y:370, w:24, h:45,x1:40, y1:17,},
    ],  
    die : [
      {x: 175, y: 2688, w: 32, h: 47, x1:40, y1: 10,},
      {x: 224, y: 2688, w: 36, h: 47, x1:40, y1: 10,},
      {x: 272, y: 2688, w: 40, h: 47, x1:40, y1: 10,},

      {x: 323, y: 2688, w: 42, h: 47, x1:40, y1: 10,},
      {x: 376, y: 2688, w: 45, h: 47, x1:40, y1: 10,},
      {x: 430, y: 2688, w: 47, h: 47, x1:40, y1: 10,},

      {x: 486, y: 2688, w: 48, h: 47, x1:40, y1: 10,},
      {x: 552, y: 2688, w: 47, h: 47, x1:40, y1: 10,},
      {x: 623, y: 2688, w: 48, h: 47, x1:40, y1: 10,},

      {x: 689, y: 2688, w: 48, h: 47, x1:40, y1: 10,},
      {x: 756, y: 2688, w: 48, h: 47, x1:40, y1: 10,},
      {x: 823, y: 2688, w: 46, h: 47, x1:40, y1: 10,},

      {x: 872, y: 2688, w: 0, h: 0, x1:600, y1: 10,},
    ],
    bullet : {x: 505, y: 1659, w: 16, h: 5, x1:524, y1: 355,}, 
  },
  tank : {
    duration : {
      run : 2000,
      bullet : 500,
      die : 1000,
      fire : 500,
    },
    run : [
      // выезд танка
      {x:932, y:1350, w:71, h:56, x1:10, y1:11,},
      {x:1006, y:1350, w:72, h:56, x1:10, y1:11,},
      {x:1081, y:1350, w:71, h:56, x1:10, y1:11,},
      {x:1155, y:1350, w:72, h:56, x1:10, y1:11,},
      {x:1230, y:1350, w:71, h:56, x1:10, y1:11,},
      {x:1304, y:1350, w:72, h:56, x1:10, y1:11,},
      
      {x:932, y:1409, w:72, h:56, x1:10, y1:11,},
      {x:1006, y:1409, w:72, h:56, x1:10, y1:11,},
      {x:1081, y:1409, w:72, h:56, x1:10, y1:11,},
      {x:1155, y:1409, w:72, h:56, x1:10, y1:11,},
      {x:1230, y:1409, w:72, h:56, x1:10, y1:11,},
      {x:1304, y:1409, w:72, h:56, x1:10, y1:11,},
      
      {x:932, y:1468, w:72, h:56, x1:10, y1:11,},
      {x:1006, y:1468, w:72, h:56, x1:10, y1:11,},
      {x:1081, y:1468, w:72, h:56, x1:10, y1:11,},
      {x:1155, y:1468, w:72, h:56, x1:10, y1:11,},
      {x:1230, y:1468, w:72, h:56, x1:10, y1:11,},
      {x:1304, y:1468, w:72, h:56, x1:10, y1:11,},
      // подготовка к стрельбе
      {x:932, y:1645, w:71, h:61,x1:10, y1:6,},
      {x:1006, y:1645, w:71, h:61,x1:10, y1:6,},
      {x:1080, y:1645, w:71, h:61,x1:10, y1:6,},
      {x:1154, y:1645, w:71, h:61,x1:10, y1:6,},
      {x:1228, y:1645, w:71, h:61,x1:10, y1:6,},
      {x:1302, y:1645, w:71, h:61,x1:10, y1:6,},
      {x:1376, y:1645, w:71, h:61,x1:10, y1:6,},
      // стреляет
      {x:932, y:1707, w:71, h:61,x1:10, y1:6,},
      {x:1006, y:1708, w:71, h:61,x1:10, y1:6,},
      {x:1080, y:1708, w:71, h:61,x1:10, y1:6,},
      {x:1154, y:1708, w:71, h:61,x1:10, y1:6,},
      {x:1377, y:1645, w:71, h:61,x1:10, y1:6,},
    ],
    fire : [
      {x:932, y:2136, w:35, h:34, x1:485, y1:312,},
      {x:970, y:2146, w:38, h:28,x1:482, y1:310,},
      {x:1011, y:2152, w:48, h:16,x1:472, y1:321,},
      {x:1062, y:2148, w:47, h:27,x1:473, y1:310,},

      {x:1112, y:2144, w:49, h:33,x1:471, y1:312,},
      {x:1164, y:2141, w:50, h:36,x1:470, y1:311,},
      {x:1217, y:2138, w:52, h:39,x1:468, y1:310,},
      {x:1271, y:2136, w:51, h:41,x1:469, y1:308,},

      {x:1325, y:2135, w:48, h:41,x1:472, y1:308,},
      {x:1376, y:2134, w:47, h:39,x1:473, y1:310,},
      {x:932, y:2181, w:47, h:39,x1:473, y1:310,},
      {x:982, y:2180, w:42, h:37,x1:478, y1:311,},

      {x:1027, y:2180, w:38, h:36,x1:482, y1:311,},
      {x:1068, y:2181, w:38, h:33,x1:482, y1:312,},
      {x:1109, y:2181, w:32, h:33,x1:488, y1:312,},
      {x:1144, y:2182, w:28, h:32,x1:492, y1:312,},
    ],
    die : [
      {x:932, y:1901, w:96, h:67,x1:0, y1:0,},
      {x:1031, y:1901, w:96, h:67,x1:0, y1:0,},
      {x:1130, y:1901, w:96, h:67,x1:0, y1:0,},

      {x:1229, y:1901, w:96, h:67,x1:0, y1:0,},
      {x:1328, y:1901, w:96, h:67,x1:0, y1:0,},
      {x:932, y:1972, w:96, h:55,x1:0, y1:12,},

      {x:1031, y:1972, w:96, h:55,x1:0, y1:12,},
      {x:1130, y:1972, w:96, h:55,x1:0, y1:12,},
      {x:1229, y:1972, w:96, h:55,x1:0, y1:12,},

      {x:1328, y:1972, w:96, h:55,x1:0, y1:12,},
      {x:932, y:2030, w:96, h:47,x1:0, y1:20,},
      {x:1031, y:2030, w:96, h:47,x1:0, y1:20,},
    ],
  },  
};