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
      <div class='viewport-full relative scroll-hidden'>
            <div class='bg-darken10 viewport-twothirds viewport-full-ml absolute top left right bottom'></div>
            <div class='absolute top-ml left bottom z1 w-full w240-ml px12 pt60-ml'>
              <div class='flex-parent flex-parent--column viewport-third h-auto-ml hmax-full bg-white round-ml shadow-darken10'>
                <div class='px12 py12 scroll-auto'>
                  <h3 class='txt-m txt-bold mb6'>Araphoe Square Neighborhood</h3>
                  
                  <p>The neighborhood of the Ball Park Rino Loft is actually Arapahoe Square.  It is in proximity to the popular Ballpark and River North (RINO) neighborhoods hence the name. Take note of the red polygon and find your way around it since those sidewalks are not ideal for foot traffic.</p> 
                                    
                </div>
                <h4 class='txt-m txt-bold px12 py12 scroll-auto'>Here are few reccomended spots in the area:</h4>
                
                <List list={mylist} />
                
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
      <li class='px12 py12 pt3 scroll-auto shadow-darken25-on-hover cursor-pointer' key={item.id} onClick={()=>directions.setDestination(item.location)}>
        <div>{item.name}</div>
      </li>
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