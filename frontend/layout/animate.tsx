import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

useEffect(() => {
  AOS.init({ duration: 800 });
}, []);
