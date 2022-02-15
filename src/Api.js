import wiki from 'wikipediajs'

async function Wikipedia () {
await wiki.search('virus', 'ko')
  .then((res) => console.log(res))
  .catch((error) => console.log(error))

}

export default Wikipedia 