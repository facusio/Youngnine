export const redirectToWhatsApp = (productName: string, size: string, quantity: number) => {
    const message = `Hola! Quiero comprar:\nProducto: ${productName}\nTalle: ${size}\nCantidad: ${quantity}`;
    const encodedMessage = encodeURIComponent(message);
    const phone = "59892409036";
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };