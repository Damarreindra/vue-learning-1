const { createApp, ref, onMounted, computed } = Vue; // Import 'computed' from Vue

createApp({
    setup() {
        const maximum = ref(50);
        const cart = ref([]);
        const dataProduct = ref([]);

        // Function to fetch data from API
        const fetchData = async () => {
            try {
                const response = await fetch('https://hplussport.com/api/products/order/price');
                const data = await response.json();
                console.log(data);
                dataProduct.value = data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        onMounted(fetchData);

        const addItem = (product) => {
            if (cart.value.length < maximum.value) {
                cart.value.push(product);
            } else {
                console.error('Cart is full');
            }
        };

        const style = {
            label : ['font-weight-bold', 'mr-2'],
            inputWidth: 60,
            sliderStatus: false
        }

        const sliderState = computed(() => {
            return style.sliderStatus ? "d-flex" : 'd-none';
        });

        return {
            maximum,
            dataProduct,
            cart,
            addItem,
            style,
            sliderState
        };
    }
}).mount('#app');
