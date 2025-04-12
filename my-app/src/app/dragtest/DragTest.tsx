'use client'; // تشير إلى أن هذا المكون سيتم تنفيذه في بيئة العميل (المتصفح).
import { useState } from 'react'; // استيراد هوك useState من React لإدارة الحالة في المكون.

export default function ResizableBox() {
  // تعريف الحالة لتخزين أبعاد المربع القابل للتغيير (العرض والارتفاع).
  const [size, setSize] = useState({ width: 150, height: 250 });
  
  // تعريف الحالة لمتابعة ما إذا كان المربع يتم سحبه أم لا.
  const [dragging, setDragging] = useState(false);
  
  // تعريف الحالة لمتابعة موقع الماوس عند بداية السحب.
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  // دالة للتعامل مع الحدث عند الضغط على زر الفأرة لتغيير حجم المربع.
  const handleMouseDownResize = (e) => {
    setDragging(true); // تعيين الحالة إلى true للإشارة إلى أن المربع يتم سحبه الآن.
    // تخزين إحداثيات الماوس عند الضغط على الزر لتحديد النقطة التي يبدأ منها السحب.
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // دالة للتعامل مع حركة الفأرة أثناء السحب وتغيير حجم المربع.
  const handleMouseMove = (e) => {
    if (!dragging) return; // إذا لم يكن المربع في وضع السحب، لا نفعل شيء.

    // حساب العرض والارتفاع الجديدين بناءً على حركة الماوس.
    const newWidth = Math.max(50, size.width + e.clientX - startPosition.x); // تأكد من أن العرض لا يقل عن 50px.
    const newHeight = Math.max(50, size.height + e.clientY - startPosition.y); // تأكد من أن الارتفاع لا يقل عن 50px.

    // تحديث حالة الأبعاد الجديدة للمربع.
    setSize({
      width: newWidth,
      height: newHeight,
    });

    // تحديث نقطة البداية للموقع الجديد للماوس.
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // دالة للتعامل مع الحدث عند إفلات زر الفأرة (إنهاء السحب).
  const handleMouseUp = () => {
    setDragging(false); // تعيين الحالة إلى false لإنهاء السحب.
  };

  return (
    <div
      className="relative w-[500px] h-[400px] border-4 border-dashed border-gray-500 mx-auto mt-10" // تعيين حجم وحواف الصندوق الكبير.
      onMouseMove={handleMouseMove} // ربط حدث حركة الفأرة بالدالة التي تعالج تغيير الحجم.
      onMouseUp={handleMouseUp} // ربط حدث إفلات زر الفأرة بالدالة التي تنهي السحب.
      onMouseLeave={handleMouseUp} // في حال ترك الفأرة المربع، يتم إنهاء السحب.
    >
      <div
        className="absolute bg-blue-500" // تعيين اللون الخلفي للمربع الصغير.
        style={{
          width: size.width, // تعيين العرض بناءً على حالة الأبعاد.
          height: size.height, // تعيين الارتفاع بناءً على حالة الأبعاد.
        }}
      >
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 cursor-se-resize" // تعيين حجم ولون مربع التحكم (الزاوية السفلى اليمنى) الذي يستخدم لتغيير الحجم.
          onMouseDown={handleMouseDownResize} // ربط حدث الضغط على الزر للدالة التي تبدأ السحب.
        />
      </div>
    </div>
  );
}
