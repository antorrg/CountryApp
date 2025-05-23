import Card from './Card'

const CountryCards = ({info, relativeRoute}) => {
  return (
    <div className='cards'>
    {info?.map((inf)=>
    <Card key={inf.id} info={inf} relativeRoute={relativeRoute}/>
    )}
    </div>
  )
}

export default CountryCards