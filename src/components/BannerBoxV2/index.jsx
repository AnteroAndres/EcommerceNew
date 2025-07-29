const BannerBoxV2 = (props) => {
  return (
    <div className='bannerBoxV2 w-full overflow-hidden rounded-md group'>
        <img src={props.image} className='w-full transition-all duration-150 group-hover:scale-105' />
    </div>
  )
}

export default BannerBoxV2;