(module
  ;; JavaScript increment function
  (import "js" "increment" (func $js_increment (result i32)))
  ;; JavaScript decrement function
  (import "js" "decrement" (func $js_decrement (result i32)))
  ;; Exported table with 4 functions
  (table $tbl (export "tbl") 4 funcref)
  ;; Global variable for internal function
  (global $i (mut i32) (i32.const 0))

  ;; Increment function
  (func $increment (export "increment") (result i32)
    (global.set $i (i32.add (global.get $i) (i32.const 1))) ;; $i++
    (global.get $i)
  )
  ;; Decrement function
  (func $decrement (export "decrement") (result i32)
    (global.set $i (i32.sub (global.get $i) (i32.const 1))) ;; $i--
    (global.get $i)
  )

  ;; Populate the table
  (elem (i32.const 0) $js_increment $js_decrement $increment $decrement)
)
