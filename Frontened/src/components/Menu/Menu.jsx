import React, { useRef } from 'react';
import './Menu.css';
import { menuList } from '../../assets/assets';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Menu = ({ category, setCategory, menuRef }) => {
  const menuListRef = useRef(null);

  const scrollLeft = () => {
    menuListRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    menuListRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  const viewAllItems = () => {
    setCategory("All");
  };

  return (
    <>
      <div className='menu-part' ref={menuRef}>
        <h2 id='menu-heading'>Explore our Menu</h2>
        <p className='menu-text'>Explore our menu with fresh, flavorful dishes. Enjoy a diverse selection, including international cuisines, vegetarian, and vegan options. Satisfy your cravings with our daily specials.</p>
        <div className='menu-container'>
          <button className='scroll-btn left' onClick={scrollLeft}><FaChevronLeft /></button>
          <div className='menu-list' ref={menuListRef}>
            {menuList.map((item, index) => (
              <div
                onClick={() => setCategory(prev => prev === item.menuName ? "All" : item.menuName)}
                key={index}
                className={`menu-list-item ${category === item.menuName ? "active" : ""}`}
              >
                <img src={item.menuImage} alt={item.menuName} />
                <p>{item.menuName}</p>
              </div>
            ))}
          </div>
          <button className='scroll-btn right' onClick={scrollRight}><FaChevronRight /></button>
        </div>
        <button id='all-items' onClick={viewAllItems}>View all items</button>
      </div>
    </>
  );
}

export default Menu;
