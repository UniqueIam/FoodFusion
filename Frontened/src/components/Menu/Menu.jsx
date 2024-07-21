import React, { useRef } from 'react';
import './Menu.css';
import { menuList } from '../../assets/assets';

function Menu({category,setCategory}) {

  const menuListRef = useRef(null);

  const scrollLeft = () => {
    menuListRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    menuListRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <>
      <div className='menu-part'>
        <h2 id='menu-heading'>Explore our Menu</h2>
        <p className='menu-text'>Explore our menu with fresh, flavorful dishes. Enjoy a diverse selection, including international cuisines, vegetarian, and vegan options. Satisfy your cravings with our daily specials.</p>
        <div
          className='menu-list'
          ref={menuListRef}
          onMouseEnter={scrollRight} 
          onMouseLeave={() => menuListRef.current.scrollTo({ left: 0 })} 
        >
          {menuList.map((item, index) => {
            return (
              <div 
               onClick={()=>setCategory(prev=>prev===item.menuName?"All":item.menuName)}
               key={index} 
               className='menu-list-item'>
                <img className={category===item.menuName?"active":""} src={item.menuImage} alt={item.menuName} />
                <p>{item.menuName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Menu;
