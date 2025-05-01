import React from "react";

async function CheckoutPage({ params }) {
  const { productId } = await params;
  return <div>CheckoutPage {productId}</div>;
}

export default CheckoutPage;
