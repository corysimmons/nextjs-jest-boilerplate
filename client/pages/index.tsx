import {useQuery, gql} from '@apollo/client'

const IndexPage = () => {
  const { error, loading, data } = useQuery(gql`
    query BookTitles {
      books {
        title
      }
    }
  `);

  if (error) {
    console.error('encountered an error!')
    console.error(error)
    return null
  }

  if (loading) {
    return <h1>...loading</h1>
  }
  
  return (
    <div>
      <h1 role="heading">index page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default IndexPage