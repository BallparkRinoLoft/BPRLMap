import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mylist } from './list'
import directions from './directions'


let SideBar = class SideBar extends React.Component {
   static propTypes = {
        active: PropTypes.object.isRequired
      }; 
     

  render(){
  
    this.props.active;
    return(
      <div className='sidebar' class='viewport-full relative scroll-hidden'>
            <div class='bg-darken10 viewport-twothirds viewport-full-ml absolute top left right bottom'></div>
            <div class='absolute top-ml left bottom z1 w-full w240-ml px12 my60'>
              <div class='flex-parent flex-parent--column viewport-third h-auto-ml hmax-full bg-white round-ml shadow-darken50-bold'>
                <div class='px6 py6 scroll-auto'>
                  <h3 class='txt-m txt-bold mb6'>Araphoe Square Neighborhood</h3>
                  
                    <p>The Paris Lofts are located in the Arapahoe Square Neighborhood.  Here is a list of some of the places I frequent when I am downtown.</p> 
                    <h4 class='txt-m txt-bold px6 py6'>Reccomended Spots:</h4>   
                    <List list={mylist} />              
                </div>
                <footer class='px12 py12 bg-gray-faint round-b-ml txt-s'>
                  Ballpark Rino Loft
                </footer>
              </div>
            </div>
          </div>
    );
  }
}

const List = ({ list }) => (
  <ul>
    {list.map(item => (
      <div class='px12 py12 pt3 shadow-darken25-on-hover cursor-pointer' key={item.id} onClick={()=>directions.setDestination(item.location)}>       
          <div class='color-gray-dark'>{item.name}</div>
          <div class='txt-light txt-s'>{item.description}</div>         
      </div>
    ))}
  </ul>
);
function mapStateToProps(state) {
  return {
    active: state.active
  };
}

SideBar = connect(mapStateToProps)(SideBar);

export default SideBar;