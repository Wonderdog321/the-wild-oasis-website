import { getCabinPrice } from "@/app/_lib/data-service";

async function Price({ cabinId }: { cabinId: number }) {
  const priceData = await getCabinPrice(cabinId);

  if (!priceData) {
    return <p>Price not available</p>; // or return null or a fallback UI
  }

  const { regularPrice, discount } = priceData;

  return (
    <p className="mt-12 text-3xl flex gap-3 items-baseline">
      {discount > 0 ? (
        <>
          <span className="text-3xl font-[350]">
            ${regularPrice - discount}
          </span>
          <span className="line-through font-semibold text-primary-600">
            ${regularPrice}
          </span>
        </>
      ) : (
        <span className="text-3xl font-[350]">${regularPrice}</span>
      )}
      <span className="text-primary-200">/ night</span>
    </p>
  );
}

export default Price;
