'use strict';

[{
  zoneRegex: /^Amaurot$/,
  timelineFile: 'amaurot.txt',
  triggers: [
    {
      id: 'Amaurot Meteor',
      regex: / 1B:\y{ObjectId}:(\y{Name}):....:....:0039:/,
      condition: function(data, matches) {
        return data.me == matches[1];
      },
      preRun: function(data) {
        data.meteor = (data.meteor || 0) + 1;
      },
      infoText: function(data) {
        if (data.meteor == 1) {
          return {
            en: 'Drop Meteor West',
            de: 'Meteor im Westen ablegen',
          };
        } else if (data.meteor == 2) {
          return {
            en: 'Drop Meteor East',
            de: 'Meteor im Osten ablegen',
          };
        }
        return {
          en: 'Meteor',
          de: 'Meteor',
        };
      },
    },
    {
      id: 'Amaurot Spread',
      regex: / 1B:\y{ObjectId}:(\y{Name}):....:....:008B:/,
      condition: function(data, matches) {
        return data.me == matches[1];
      },
      infoText: function(data) {
        return {
          en: 'Spread',
          de: 'Verteilen',
        };
      },
    },
    {
      id: 'Amaurot Final Sky',
      regex: / 14:3CCB:The First Beast starts using The Final Sky/,
      regexDe: / 14:3CCB:Das erste Unheil starts using Letzter Himmel/,
      alertText: {
        en: 'Hide Behind Boulder',
        de: 'Hinter einem Felsen verstecken',
      },
    },
    {
      id: 'Amaurot Shadow Wreck',
      regex: / 14:3CE3:Therion starts using Shadow Wreck/,
      regexDe: / 14:3CE3:Therion starts using Schatten Des Unheils/,
      regexFr: / 14:3CE3:Mégatherion starts using Calamité sombre/,
      regexJa: / 14:3CE3:メガセリオン starts using シャドウレック/,
      condition: function(data) {
        return data.role == 'healer';
      },
      infoText: {
        en: 'aoe',
        en: 'AoE',
        fr: 'Dégâts de zone',
      },
    },
    {
      id: 'Amaurot Apokalypsis',
      regex: / 14:3CD7:Therion starts using Apokalypsis/,
      regexDe: / 14:3CD7:Therion starts using Apokalypse/,
      regexFr: / 14:3CD7:Mégatherion starts using Apokalypsis/,
      regexJa: / 14:3CD7:メガセリオン starts using アポカリュプシス/,
      alertText: {
        en: 'Get Off',
        de: 'Runter gehen',
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'ヴォイドウォーカー': 'ヴォイドウォーカー',
        'The First Beast': 'das erste Unheil',
        'The Face of the Beast': 'Antlitz des Boten',
        'Fallen Star': 'Komet',
        'Titania': 'Titania',
        'Therion': 'Therion',
        'Terminus Twitcher': 'Terminus-Zerrer',
        'Terminus Stalker': 'Terminus-Schleicher',
        'Terminus Sprinter': 'Terminus-Sprinter',
        'Terminus Slitherer': 'Terminus-Schlitterer',
        'Terminus Shriver': 'Terminus-Schänder',
        'Terminus Shadower': 'Terminus-Schattenschleicher',
        'Terminus Roiler': 'Terminus-Trüber',
        'Terminus Reaper': 'Terminus-Schnitter',
        'Terminus Pursuer': 'Terminus-Verfolger',
        'Terminus Lacerator': 'Terminus-Schlitzer',
        'Terminus Idolizer': 'Terminus-Anbeter',
        'Terminus Howler': 'Terminus-Heuler',
        'Terminus Flesher': 'Terminus-Zerfleischer',
        'Terminus Drainer': 'Terminus-Schlürfer',
        'Terminus Detonator': 'Terminus-Detonator',
        'Terminus Crier': 'Terminus-Schreier',
        'Terminus Bellwether': 'Läuter der Totenglocke',
        'Terminus Beholder': 'Terminus-Betrachter',
        'Mithridates': 'Mithridates',
        'Engage!': 'Start!',
        'The First Doom': 'Erstes Unheil',
        'The Second Doom': 'Zweites Unheil',
        'The Third Doom': 'Drittes Unheil',
      },
      'replaceText': {
        '攻撃': '攻撃',
        'The Final Sky': 'Letzter Himmel',
        'The Falling Sky': 'Unheilvoller Himmel',
        'The Burning Sky': 'Brennender Himmel',
        'The Black Death': 'Schwarzer Tod',
        'attack': 'Attacke',
        'Whack': 'Wildes Schlagen',
        'Venomous Breath': 'Giftatem',
        'Unknown Ability': 'Unknown Ability',
        'Turnabout': 'Umdrehung',
        'Towerfall': 'Turmsturz',
        'Therion Charge': 'Therions Rage',
        'Sickly Inferno': 'Verdorbenes Flammenmeer',
        'Sickly Flame': 'Flamme der Verderbnis',
        'Shrill Shriek': 'Schriller Schrei',
        'Shadow Wreck': 'Schatten des Unheils',
        'Self-destruct': 'Selbstzerstörung',
        'Misfortune': 'Unglück',
        'Meteor Rain': 'Meteorschauer',
        'Malevolence': 'Missgunst',
        'Ill Will': 'Böswilligkeit',
        'Force of Loathing': 'Welle der Abscheu',
        'Enrage': 'Finalangriff',
        'Earthquake': 'Erdbeben',
        'Disquieting Gleam': 'Bedrohlicher Schimmer',
        'Deathly Ray': 'Tödlicher Strahl',
        'Deadly Tentacles': 'Tödliche Tentakel',
        'Damning Ray': 'Verdammnisstrahl',
        'Cosmic Shrapnel': 'Kosmos-Splitter',
        'Cosmic Kiss': 'Einschlag',
        'Comet': 'Komet',
        'Burst': 'Explosion',
        'Apokalypsis': 'Apokalypse',
        'Aetherspike': 'Ätherstachel',
        '--untargetable--': '--nich anvisierbar--',
        '--targetable--': '--anvisierbar--',
      },
      '~effectNames': {
        'Healing Magic Down': 'Heilmagie -',
        'Fire Resistance Down': 'Feuerresistenz -',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'ヴォイドウォーカー': 'ヴォイドウォーカー',
        'The First Beast': 'annélide de l\'apocalypse',
        'The Face of the Beast': 'visages de la Bête',
        'Fallen Star': 'étoile',
        'Titania': 'Titania',
        'Therion': 'Mégatherion',
        'Terminus Twitcher': 'picoreur de l\'apocalypse',
        'Terminus Stalker': 'traqueur de l\'apocalypse',
        'Terminus Sprinter': 'sprinteur de l\'apocalypse',
        'Terminus Slitherer': 'rampeur de l\'apocalypse',
        'Terminus Shriver': 'flétrisseur de l\'apocalypse',
        'Terminus Shadower': 'ombrageur de l\'apocalypse',
        'Terminus Roiler': 'nébulosité de l\'apocalypse',
        'Terminus Reaper': 'faucheuse de l\'apocalypse',
        'Terminus Pursuer': 'poursuivant de l\'apocalypse',
        'Terminus Lacerator': 'lacérateur de l\'apocalypse',
        'Terminus Idolizer': 'adorateur de l\'apocalypse',
        'Terminus Howler': 'hurleur de l\'apocalypse',
        'Terminus Flesher': 'boucher de l\'apocalypse',
        'Terminus Drainer': 'draineur de l\'apocalypse',
        'Terminus Detonator': 'détonateur de l\'apocalypse',
        'Terminus Crier': 'crieur de l\'apocalypse',
        'Terminus Bellwether': 'sonneur de glas de l\'apocalypse',
        'Terminus Beholder': 'tyrannœil de l\'apocalypse',
        'Mithridates': 'Mithridate',
        'Engage!': 'À l\'attaque',
        'The First Doom': 'La première Calamité',
        'The Second Doom': 'La deuxième Calamité',
        'The Third Doom': 'La troisième Calamité',
      },
      'replaceText': {
        '攻撃': '攻撃',
        'The Final Sky': 'Étoile de la ruine',
        'The Falling Sky': 'Étoile de la calamité',
        'The Burning Sky': 'Étoile du désastre',
        'The Black Death': 'Souffle de mort noire',
        'attack': 'Attaque',
        'Whack': 'Tannée',
        'Venomous Breath': 'Souffle venimeux',
        'Unknown Ability': 'Unknown Ability',
        'Turnabout': 'Rotation',
        'Towerfall': 'Écroulement',
        'Therion Charge': 'Charge de therion',
        'Sickly Inferno': 'Conflagration trouble',
        'Sickly Flame': 'Flamme trouble',
        'Shrill Shriek': 'Cri perçant',
        'Shadow Wreck': 'Calamité sombre',
        'Self-destruct': 'Auto-destruction',
        'Misfortune': 'Infortune',
        'Meteor Rain': 'Pluie d\'étoiles',
        'Malevolence': 'Attaque fielleuse',
        'Ill Will': 'Rancœur',
        'Force of Loathing': 'Onde d\'aversion',
        'Enrage': 'Enrage',
        'Earthquake': 'Tremblement de terre',
        'Disquieting Gleam': 'Lueur angoissante',
        'Deathly Ray': 'Rayon létal',
        'Deadly Tentacles': 'Tentacules mortels',
        'Damning Ray': 'Rayon accablant',
        'Cosmic Shrapnel': 'Éclatement',
        'Cosmic Kiss': 'Impact',
        'Comet': 'Comète',
        'Burst': 'Explosion',
        'Apokalypsis': 'Apokalypsis',
        'Aetherspike': 'Pic d\'éther',
        '--untargetable--': '--Impossible à cibler--',
        '--targetable--': '--Ciblable--',
        '--sync--': '--Synchronisation--',
        '--Reset--': '--Réinitialisation--',
      },
      '~effectNames': {
        'Healing Magic Down': 'Malus De Soin',
        'Fire Resistance Down': 'Résistance Au Feu Réduite',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'ヴォイドウォーカー': 'ヴォイドウォーカー',
        'The First Beast': 'ファースト・ビースト',
        'The Face of the Beast': 'フェイス・オブ・ビースト',
        'Fallen Star': '流星',
        'Titania': 'ティターニア',
        'Therion': 'メガセリオン',
        'Terminus Twitcher': 'ターミナス・ツイッチャー',
        'Terminus Stalker': 'ターミナス・ストーカー',
        'Terminus Sprinter': 'ターミナス・スプリンター',
        'Terminus Slitherer': 'ターミナス・スリザーラー',
        'Terminus Shriver': 'ターミナス・シュライヴァー',
        'Terminus Shadower': 'ターミナス・シャドワー',
        'Terminus Roiler': 'ターミナス・ロイラー',
        'Terminus Reaper': 'ターミナス・リーパー',
        'Terminus Pursuer': 'ターミナス・パースアー',
        'Terminus Lacerator': 'ターミナス・ラサレーター',
        'Terminus Idolizer': 'ターミナス・アイドライザー',
        'Terminus Howler': 'ターミナス・ハウラー',
        'Terminus Flesher': 'ターミナス・フレッシャー',
        'Terminus Drainer': 'ターミナス・ドレイナー',
        'Terminus Detonator': 'ターミナス・デトネーター',
        'Terminus Crier': 'ターミナス・クライヤー',
        'Terminus Bellwether': 'ターミナス・ベルウェザー',
        'Terminus Beholder': 'ターミナス・ビホルダー',
        'Mithridates': 'ミトリダテス',
        'Engage!': '戦闘開始！',
        'The First Doom': '第一の災い',
        'The Second Doom': '第二の災い',
        'The Third Doom': '第三の災い',
      },
      'replaceText': {
        '攻撃': '攻撃',
        'The Final Sky': '終末の流星',
        'The Falling Sky': '厄災の流星',
        'The Burning Sky': '変災の流星',
        'The Black Death': '黒死の吐息',
        'attack': '攻撃',
        'Whack': '乱打',
        'Venomous Breath': 'ベノムブレス',
        'Unknown Ability': 'Unknown Ability',
        'Turnabout': '旋回',
        'Towerfall': '倒壊',
        'Therion Charge': 'セリオンチャージ',
        'Sickly Inferno': '汚濁の豪炎',
        'Sickly Flame': '汚濁の火焔',
        'Shrill Shriek': '絶叫',
        'Shadow Wreck': 'シャドウレック',
        'Self-destruct': '自爆',
        'Misfortune': 'ミスフォーチュン',
        'Meteor Rain': '流星群',
        'Malevolence': '邪悪撃',
        'Ill Will': '悪意',
        'Force of Loathing': '憎悪の波動',
        'Earthquake': '地震',
        'Disquieting Gleam': '不穏なる輝き',
        'Deathly Ray': 'デスリ―レイ',
        'Deadly Tentacles': 'デッドリー・テンタクル',
        'Damning Ray': 'ダミングレイ',
        'Cosmic Shrapnel': '飛散',
        'Cosmic Kiss': '着弾',
        'Comet': 'コメット',
        'Burst': '爆発',
        'Apokalypsis': 'アポカリュプシス',
        'Aetherspike': 'エーテルスパイク',
      },
      '~effectNames': {
        'Healing Magic Down': '回復魔法効果低下',
        'Fire Resistance Down': '火属性耐性低下',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'ヴォイドウォーカー': 'ヴォイドウォーカー',
        'Engage!': '战斗开始！',
      },
      'replaceText': {
        'attack': '攻击',
        'Unknown Ability': 'Unknown Ability',
      },
      '~effectNames': {
        'Healing Magic Down': '治疗魔法效果降低',
        'Fire Resistance Down': '火属性耐性降低',
      },
    },
  ],
}];
