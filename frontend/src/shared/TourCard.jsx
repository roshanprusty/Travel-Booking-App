import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './tour-card.css';
import calculateAvgRating from '../utils/avgRating';

const TourCard = ({ tour }) => {
   const { _id, title, city, photo, price, featured, reviews } = tour;
   const { totalRating, avgRating } = calculateAvgRating(reviews);

   return (
      <div className='tour__card'>
         <Card>
            <div className="tour__img">
               <img src={photo} alt="tour-img" />
               {featured && <span>Featured</span>}
            </div>

            <CardBody>
               <div className="card__top d-flex align-items-center justify-content-between">
                  <span className="tour__location d-flex align-items-center gap-1">
                     <i className='ri-map-pin-line'></i> {city}
                  </span>
                  <span className="tour__rating d-flex align-items-center gap-1">
                     <i className='ri-star-fill'></i> {avgRating === 0 ? null : avgRating}
                     {totalRating === 0 ? null : <span>({reviews.length})</span>}
                  </span>
               </div>

               <h5 className='tour__title'><Link to={`/tours/${_id}`}>{title}</Link></h5>

               <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                  <h5>${price} <span> /per person</span></h5>

                  <Link to={`/tours/${_id}`}>
                     <button className='booking__btn'>Book Now</button>
                  </Link>
               </div>
            </CardBody>
         </Card>
      </div>
   );
};

TourCard.propTypes = {
   tour: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      featured: PropTypes.bool.isRequired,
      reviews: PropTypes.arrayOf(
         PropTypes.shape({
            length: PropTypes.number.isRequired,
         })
      ).isRequired,
   }).isRequired,
};

export default TourCard;
