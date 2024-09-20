import React, { useState } from 'react';
import './addItem.css';

const categories = ['전체', '🔥HOT', '편의점', '간식', '화장품'];

const AddItem = ({ onAddReward }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCategory, setItemCategory] = useState(categories[0]);
  const [itemImage, setItemImage] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (itemName && itemPrice && itemDescription && itemCategory && itemImage) {
     
      onAddReward({
        title: `${itemPrice} 콩`,
        description: itemDescription,
        category: itemCategory,
        imageSrc: URL.createObjectURL(itemImage),
        groupSrc: null, // You can add groupSrc if needed
      });

      setItemName('');
      setItemPrice('');
      setItemDescription('');
      setItemCategory(categories[0]);
      setItemImage(null);
    }
  };

  return (
    <div className="admin-page">
      <h2>상품 추가하기</h2>
      <form onSubmit={handleFormSubmit} className="admin-form">
        <div className="form-group">
          <label>상품 이름:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>상품 가격 (콩):</label>
          <input
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>상품 설명:</label>
          <textarea
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>카테고리:</label>
          <select
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
            required
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>사진 업로드:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setItemImage(e.target.files[0])}
            required
          />
        </div>

        <button type="submit">상품 추가</button>
      </form>
    </div>
  );
};

export default AddItem;
