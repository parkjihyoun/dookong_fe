import React, { useState } from 'react';
import './addItem.css';

const categories = ['전체', '🔥HOT', '편의점', '간식', '화장품'];

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCategory, setItemCategory] = useState(categories[0]);
  const [itemImage, setItemImage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (itemName && itemPrice && itemDescription && itemCategory && itemImage) {
      const formData = new FormData();

      // JSON 데이터를 FormData에 추가
      formData.append('itemData', JSON.stringify({
        name: itemName,
        requiredPoints: itemPrice,
        description: itemDescription,
        category: itemCategory,
      }));

      // 이미지 파일 추가
      formData.append('image', itemImage);

      try {
        const response = await fetch('http://localhost:8080/api/items/create', { // 백엔드 URL 확인
          method: 'POST',
          body: formData, // FormData 전송
          // Content-Type을 명시적으로 설정하지 않음
        });

        if (response.ok) {
          alert('상품이 성공적으로 추가되었습니다.');
          setItemName('');
          setItemPrice('');
          setItemDescription('');
          setItemCategory(categories[0]);
          setItemImage(null);
        } else {
          const errorText = await response.text();
          alert('상품 추가에 실패했습니다. ' + errorText);
        }
      } catch (error) {
        console.error('Error adding item:', error);
        alert('상품 추가 중 오류가 발생했습니다.');
      }
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
