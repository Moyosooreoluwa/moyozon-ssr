'use client';
import { StoreContext } from '@/store/Store';
import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import {
  ChangeEvent,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import MessageBox from './MessageBox';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FaRegCircleXmark } from 'react-icons/fa6';

type Props = {
  productId: string;
};
interface Product {
  _id: string;
  name: string;
  image: string;
  images?: string[];
  description: string;
  price: number;
  stockCount: number;
  rating: number;
  reviewCount: number;
  slug: string;
  category: string;
  brand: string;
}
interface State {
  loading: boolean;
  loadingUpdate: boolean;
  loadingUpload: boolean;
  error: string;
}
type Action =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: Product }
  | { type: 'FETCH_FAIL'; payload: string }
  | { type: 'UPDATE_REQUEST' }
  | { type: 'UPDATE_SUCCESS' }
  | { type: 'UPDATE_FAIL' }
  | { type: 'UPLOAD_REQUEST' }
  | { type: 'UPLOAD_SUCCESS' }
  | { type: 'UPLOAD_FAIL'; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function EditProductForm({ productId }: Props) {
  const router = useRouter();
  const { state } = useContext(StoreContext);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
      loadingUpdate: false,
      loadingUpload: false,
    });
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState<string[]>([]); // Explicitly type as string[]
  const [category, setCategory] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images || []);
        setCategory(data.category);
        setStockCount(data.stockCount);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const uploadFileHandler = async (
    e: ChangeEvent<HTMLInputElement>,
    forImages: boolean
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error('No file selected');
      return;
    }

    const file = files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo?.token || ''}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const deleteFileHandler = async (fileName: string, forImages: boolean) => {
    console.log(fileName, forImages);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    toast.success('Image removed successfully. click Update to apply it');
  };

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          stockCount,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <MessageBox variant="danger">Product not Found</MessageBox>
      ) : (
        <Form className="max-w-[400px] m-auto p-4" onSubmit={submitHandler}>
          <FormGroup className="mb-3" controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="slug">
            <FormLabel>Slug</FormLabel>
            <FormControl
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="name">
            <FormLabel>Price</FormLabel>
            <FormControl
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="image">
            <FormLabel>Image </FormLabel>
            <FormControl
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="imageFile">
            <FormLabel>Upload Image</FormLabel>
            <Form.Control
              type="file"
              onChange={(e) =>
                uploadFileHandler(e as ChangeEvent<HTMLInputElement>, false)
              } // Pass false for single image
            />
            {loadingUpload && <LoadingSpinner />}
          </FormGroup>
          <FormGroup className="mb-3" controlId="additionalImage">
            <Form.Label>Additional Images</Form.Label>
            {images.length === 0 && (
              <MessageBox variant="secondary">No Additional Image</MessageBox>
            )}
            <ListGroup variant="flush">
              {images.map((x) => (
                <ListGroupItem key={x}>
                  {x}
                  <Button
                    variant="light"
                    onClick={() => deleteFileHandler(x, true)}
                  >
                    <FaRegCircleXmark />
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </FormGroup>
          <FormGroup className="mb-3" controlId="additionalImageFile">
            <FormLabel>Upload Aditional Image(s)</FormLabel>
            <FormControl
              type="file"
              disabled={loadingUpload}
              onChange={(e) =>
                uploadFileHandler(e as ChangeEvent<HTMLInputElement>, true)
              }
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="category">
            <FormLabel>Category</FormLabel>
            <FormControl
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="brand">
            <FormLabel>Brand</FormLabel>
            <FormControl
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="stockCount">
            <FormLabel>Count In Stock</FormLabel>
            <FormControl
              value={stockCount}
              onChange={(e) => setStockCount(e.target.value)}
              type="number"
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="description">
            <FormLabel>Description</FormLabel>
            <FormControl
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormGroup>
          <div className="mb-3">
            {loadingUpdate ? (
              <LoadingSpinner />
            ) : (
              <Button disabled={loadingUpdate} type="submit">
                Update
              </Button>
            )}
          </div>
        </Form>
      )}
    </>
  );
}
