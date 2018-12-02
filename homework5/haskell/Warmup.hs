module Warmup
    (change
    , stripQuotes)
    where

change amount =
    if amount < 0 then
        Left "amount cannot be negative"
    else
        let
            (quarters, afterQuarters) = amount `divMod` 25
            (dimes, afterDimes) = afterQuarters `divMod` 10
            (nickels, pennies) = afterDimes `divMod` 5
        in Right (quarters, dimes, nickels, pennies)

stripQuotes s = filter (\c -> c /= '\'' && c /= '"') s