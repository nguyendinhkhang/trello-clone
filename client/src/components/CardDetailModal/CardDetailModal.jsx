import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dataCardLabel } from '../../apis/dataBackground'
import useOutSideClick from '../../hooks/useOutSideClick'
import { deleteCardAsync, getCardDetailAsync, updateCardAsync } from '../../redux/action/CardAction'
import Loader from '../Loader/Loader'
import { updateCardCoverImage, updateCardDescription, updateCardLabel, updateCardTitle } from '../../redux/slice/cardDetailSlice'
import './CardDetailModal.scss'
import { deleteCard } from '../../redux/slice/boardDetailSlice'

const CardDetailModal = () => {
  const [titleCard, setTitleCard] = useState('')
  const [descriptionCard, setDescriptionCard] = useState('')
  const [labelCard, setLabelCard] = useState([])
  const [coverImage, setCoverImage] = useState('')
  const [coverImagePreview, setCoverImagePreview] = useState('')
  const navigate = useNavigate()
  const inputTitleRef = useRef()
  const inputDescRef = useRef()
  const dispatch = useDispatch()
  const { ref, isOpen, setIsOpen } = useOutSideClick()
  const { loading, loadingCoverImage, card } = useSelector(state => state.card)
  const { id } = useParams()

  const closeModal = () => {
    navigate(-1)
  }

  const handleChangeInputTitle = (e) => {
    setTitleCard(e.target.value)
    inputTitleRef.current.style.height = `${inputTitleRef.current.scrollHeight}px`
  }

  const handleChangeInputDesc = (e) => {
    setDescriptionCard(e.target.value)
    inputDescRef.current.style.height = `${inputDescRef.current.scrollHeight <= 64 ? '64' : inputDescRef.current.scrollHeight}px`
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
  }

  const handleClickLabel = (labelClick) => {
    const existLabel = labelCard.some(labelCard => labelCard.id === labelClick.id)
    if (!existLabel) {
      setLabelCard(preLabelCard => [...preLabelCard, labelClick])
    }
    if (existLabel) {
      setLabelCard(preLabelCard => preLabelCard.filter(labelCard => labelCard.id !== labelClick.id))
    }
  }

  const handleBlurInputTitle = () => {
    if (titleCard !== card.cardTitle) {
      dispatch(updateCardTitle({ cardTitle: titleCard }))
      dispatch(updateCardAsync({ _id: card._id, cardTitle: titleCard }))
    }
  }

  const handleBlurInputDesc = () => {
    if (descriptionCard !== card.description) {
      dispatch(updateCardDescription({ description: descriptionCard }))
      dispatch(updateCardAsync({ _id: card._id, description: descriptionCard }))
    }
  }

  const handleChangeInputFile = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCoverImagePreview(reader.result)
        setCoverImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleDeleteCard = () => {
    dispatch(deleteCardAsync({ _id: card._id }))
    dispatch(deleteCard({ _id: card._id }))
    navigate(-1)
  }

  useEffect(() => {
    if (descriptionCard === '') {
      inputDescRef.current.style.height = '64px'
    }
  }, [descriptionCard, inputDescRef])

  useEffect(() => {
    if (card._id !== id) {
      dispatch(getCardDetailAsync({ _id: id }))
    }
    setTitleCard(card.cardTitle)
    setDescriptionCard(card.description)
    setLabelCard(card.label)
    if (card.coverImage) {
      setCoverImagePreview(card.coverImage.url)
    }
  }, [inputTitleRef, dispatch, card, id])

  useEffect(() => {
    if (isOpen === false) {
      dispatch(updateCardLabel({ label: labelCard }))
      dispatch(updateCardAsync({ _id: id, label: labelCard }))
    }
  }, [labelCard, dispatch, id, isOpen])

  useEffect(() => {
    if (coverImage) {
      dispatch(updateCardCoverImage({ coverImage: coverImage }))
      dispatch(updateCardAsync({ _id: card._id, coverImage: coverImage }))
      setCoverImage('')
    }
  }, [coverImage, dispatch, card])

  return (
    <div className='card-detail-container'>
      <div className='overlays' onClick={closeModal} />
      <div className='modal-wrapper'>
        {loading
          ? <Loader />
          : <>
            <div className='modal-cover-container'>
              <div className='modal-close' onClick={closeModal} >
                <i className='icon-close bi bi-x-lg' />
              </div>
              {loadingCoverImage
                ? <Loader />
                : <div className='modal-cover' style={{ backgroundImage: `url(${coverImagePreview})` }}></div>
              }
              <label htmlFor='chooseFile' className='modal-choose-cover'>
                <i className='icon-image bi bi-card-image' />
                Cover Image
              </label>
              <input type='file' id='chooseFile' onChange={handleChangeInputFile} accept="image/*" hidden />
            </div>
            <div className='modal-body'>
              <div className='modal-control'>
                <div className='modal-control-header'>
                  <i className='icon-control bi bi-credit-card' />
                  {/* <h2 className='modal-control-title'>{card.cardTitle}</h2> */}
                  <textarea
                    ref={inputTitleRef}
                    className='modal-control-textarea-title'
                    maxLength='210'
                    value={titleCard}
                    onChange={handleChangeInputTitle}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlurInputTitle}
                  />
                </div>
                <div className='modal-control-body'>
                  <p className='in-list'>
                    In list <span className='list-name'>{card.listId && card.listId.listTitle}</span>
                  </p>
                </div>
              </div>
              <div className='modal-control'>
                <div className='modal-control-header'>
                  <i className='icon-control bi bi-tag' />
                  <h3>Labels</h3>
                </div>
                <div className='modal-control-body modal-control-body-grid'>
                  <span className='add-label' onClick={() => setIsOpen(true)} >
                    <i className='bi bi-plus-lg' />
                  </span>
                  {isOpen &&
                    <div className='extras-list' ref={ref}>
                      <div className='extras-header'>
                        <span>Label</span>
                        <div className='extras-close' onClick={() => setIsOpen(false)}>
                          <i className='bi bi-x-lg' />
                        </div>
                      </div>
                      <ul className='extras-list-item'>
                        {dataCardLabel.map(label => (
                          <li
                            key={label.id}
                            className='extras-item'
                            style={{ backgroundColor: `${label.bgLabel}` }}
                            onClick={() => handleClickLabel(label)}
                          >
                            {label.textLabel}
                            <i
                              className='icon-check bi bi-check-lg'
                              style={{ display: `${labelCard && labelCard.some(labelCard => labelCard.id === label.id) ? 'Block' : ''}` }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                  {labelCard && labelCard.map(label => (
                    <span
                      key={label.id}
                      className='card-detail-label'
                      style={{ backgroundColor: `${label.bgLabel}` }}
                    >
                      {label.textLabel}
                    </span>
                  ))}
                </div>
              </div>
              <div className='modal-control'>
                <div className='modal-control-header'>
                  <i className='icon-control bi bi-text-left' />
                  <h3>Description</h3>
                </div>
                <div className='modal-control-body'>
                  <textarea
                    ref={inputDescRef}
                    className='modal-control-textarea-description'
                    placeholder='Add more detail description...'
                    maxLength='600'
                    value={descriptionCard}
                    onChange={handleChangeInputDesc}
                    onBlur={handleBlurInputDesc}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
            <div className='delete-card' onClick={handleDeleteCard}>
              <i className='icon-delete bi bi-trash' />
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default CardDetailModal