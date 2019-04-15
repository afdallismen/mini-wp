const faker = require('faker')

function Article () {
  return {
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    featured_image: faker.random.image(),
    created_at: faker.date.recent()
  }
}

module.exports = () => {
  return {
    articles: Array.from(Array(5), el => new Article())
  }
}