const express = require('express')
const cors = require('cors')
const LoremIpsum = require("lorem-ipsum").LoremIpsum
const heros = require('./data/heros.json')

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 8, min: 4 },
  wordsPerSentence: { max: 16, min: 4 },
})

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const PORT = 4000
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send(`server is running on port: ${PORT}`)
})

app.get('/hero', (req, res) => {
  const heroList = heros.map((hero) => ({
    id: `${hero.id}`,
    name: hero.localized_name,
    attr: hero.primary_attr,
    attackType: hero.attack_type,
    img: hero.img,
    icon: hero.icon,
    health: hero.base_health,
    mana: hero.base_mana,
    armor: hero.base_armor,
    minAttack: hero.base_attack_min,
    maxAttack: hero.base_attack_max,
    str: hero.base_str,
    agi: hero.base_agi,
    int: hero.base_int,
    desc: lorem.generateParagraphs(randomIntFromInterval(5, 8)),
  }))

  res.json({ data: heroList })
})

app.get('/hero/:id', (req, res) => {
  try {
    const idIn = req.params.id
    const hero = heros.find(({ id }) => `${id}` === `${idIn}`)
    if (hero) {
      res.json({
        data: {
          id: `${hero.id}`,
          name: hero.localized_name,
          attr: hero.primary_attr,
          attackType: hero.attack_type,
          img: hero.img,
          icon: hero.icon,
          health: hero.base_health,
          mana: hero.base_mana,
          armor: hero.base_armor,
          minAttack: hero.base_attack_min,
          maxAttack: hero.base_attack_max,
          str: hero.base_str,
          agi: hero.base_agi,
          int: hero.base_int,
          desc: lorem.generateParagraphs(randomIntFromInterval(5, 8)),
        },
      })
    } else [
      res.status(400).json({ error: `not found hero id: ${idIn}` })
    ]
  } catch (e) {
    res.status(400).json({ error: e })
  }
})

app.listen(PORT, () => {
  console.log('server is running on port:', PORT)
})
