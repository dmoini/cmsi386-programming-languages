module Warmup
    (change)
    where

change amount =
    if amount < 0 then
        Left "amount cannot be negative"
    else
        let
            (quarters, afterQuarters) = amount divMod 25
            (dimes, afterDimes) = afterQuarters divMod 10
            (nickels, afterNickels) = afterDimes divMod 5
            pennies = afterNickels
            in
        Right (quarters, dimes, nickels, pennies)
        -- Right (0, 0, 0, 0)

stripQuotes s = filter(\c -> c /= '\'' && c /= '"')