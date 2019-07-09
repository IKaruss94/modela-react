<?php 
    
    include('../_inc/db_connect.php');
    include('../_inc/pdo_functions.php');

    try
    {        
        session_start();

		$DB->beginTransaction();

            //adding to database 

                $order='';
                foreach($_SESSION['cart'] as $item)
                {
                    $order .= $item['car_id'] .'-'. $item['num'] .'='. $item['qnt'].'; '; 
                }

                if( $_POST["pack_name"] != '' &&  $_POST["pack_address"] != '' && $_POST["pack_city"] != '' && $_POST["pack_zip"] != '' && $_POST["pack_country"] != '' )
                { 

                    $add_order = $DB->prepare('INSERT INTO `orders`( `Ordered_items`, `Pay_method`, `Cust_name`, `Cust_lastname`, `Cust_email`, `Cust_address`, `Cust_city`, `Cust_zip`, `Cust_state`, `Cust_country`, `Cust_phone`, `Dest_name`, `Dest_address`, `Dest_city`, `Dest_zip`, `Dest_state`, `Dest_country`) VALUES (:order, :payment, :c_name, :c_lastname, :c_email, :c_address, :c_city, :c_zip, :c_state, :c_country, :c_phone, :d_name, :d_address, :d_city, :d_zip, :d_state, :d_country)');

                    $add_order->execute(array(
                        ':order' => $order, 
                        ':payment' => $_POST["payment_method"], 
                        ':c_name' => $_POST["pers_name"], 
                        ':c_lastname' => $_POST["last_name"],
                        ':c_email' => $_POST["e_mail"], 
                        ':c_address' => $_POST["pers_address"], 
                        ':c_city' => $_POST["pers_city"], 
                        ':c_zip' => $_POST["pers_zip"], 
                        ':c_state' => $_POST["pers_state"], 
                        ':c_country' => $_POST["pers_country"], 
                        ':c_phone' => $_POST["phone"], 
                        ':d_name' => $_POST["pack_name"], 
                        ':d_address' => $_POST["pack_address"], 
                        ':d_city' => $_POST["pack_city"], 
                        ':d_zip' => $_POST["pack_zip"], 
                        ':d_state' => $_POST["pack_state"], 
                        ':d_country' => $_POST["pack_country"]
                    ));
                    
                }
                else
                {     
                    $add_order = $DB->prepare('INSERT INTO `orders`(`Ordered_items`, `Pay_method`, `Cust_name`, `Cust_lastname`, `Cust_email`, `Cust_address`, `Cust_city`, `Cust_zip`, `Cust_state`, `Cust_country`, `Cust_phone`) VALUES (:order, :payment, :c_name, :c_lastname, :c_email, :c_address, :c_city, :c_zip, :c_state, :c_country, :c_phone)');

                    $add_order->execute(array(
                        ':order' => $order, 
                        ':payment' => $_POST["payment_method"], 
                        ':c_name' => $_POST["pers_name"], 
                        ':c_lastname' => $_POST["last_name"],
                        ':c_email' => $_POST["e_mail"], 
                        ':c_address' => $_POST["pers_address"], 
                        ':c_city' => $_POST["pers_city"], 
                        ':c_zip' => $_POST["pers_zip"], 
                        ':c_state' => $_POST["pers_state"], 
                        ':c_country' => $_POST["pers_country"], 
                        ':c_phone' => $_POST["phone"]
                    ));
                }
            //

            $order_id = $DB->lastInsertId();

            // sending e-mail 
       
                // create mail message to customer
                    $em_to = $_POST['e_mail'];                
                    $em_from = 'Modela-L<modela.lv@gmail.com>';

                    $subject = 'Your order with modela.lv'; 
                    $title = 'Thank you for your order!';

                    CustomerMail($em_to, $em_from, $subject, $title, $order_id);
                //

                // create mail message to merchant
                    $em_to = 'Modela-L<modela.lv@gmail.com>';
                    $em_from = $_POST["pers_name"] .' '. $_POST["last_name"] .'<'. $_POST['e_mail'] .'>';  

                    $subject = 'NEW ORDER #'. $order_id;//"Order confirmation for www.modela.lv";
                    $title = "The message is sent for your records of a purchase.  Please review the purchase below, and fulfill as necessary.";

                    OwnerMail($em_to, $em_from, $subject, $title, $order_id);
                //

            //


		$DB->commit();

        $_SESSION = array();
        session_destroy();
    }
    catch(PDOException $ex) 
    {
        $DB->rollBack();
        echo 'error';
        error_log(date_format(date_create(), 'Y-m-d H:i:s') .' : '. $ex->getMessage() . PHP_EOL, 3, "../_inc/errors/checkout.log");
    }


    function CustomerMail($mailTo, $mailFrom, $subject, $title, $order_id)
    {
        $header  = 'From: '. $mailFrom.'\r\n'; 
        $header .= 'MIME-Version: 1.0 \r\n'; 
        $header .= 'Content-Type: text/html; charset=utf-8'; 


        $message = '<html><body>';

            $message .= '<header>';
                $message .= '<h3>'. $title. '</h3>';
                $message .= '<h4>Order ID: '. $order_id .'</h4>';
                $message .= '<h4>Order date: '. date("Y-m-d H:i:s") .'</h4>';
            $message .= '</header>';

            $message .= '<h4>Customer info : </h4>';
            $message .= '<table rules="all" cellpadding="5">';
            
                $message .= '<tr><td><strong>Firstname : </strong> </td><td>' . $_POST['pers_name'] . '</td></tr>';
                $message .= '<tr><td><strong>Lastname : </strong> </td><td>' . $_POST['last_name'] . '</td></tr>';
                $message .= '<tr><td><strong>E-mail : </strong> </td><td>' . $_POST['e_mail'] . '</td></tr>';
                $message .= '<tr><td><strong>Address : </strong> </td><td>' . $_POST['pers_address'] . '</td></tr>';
                $message .= '<tr><td><strong>City : </strong> </td><td>' . $_POST['pers_city'] . '</td></tr>';
                $message .= '<tr><td><strong>ZIP : </strong> </td><td>' . $_POST['pers_zip'] . '</td></tr>';
                $message .= '<tr><td><strong>State : </strong> </td><td>' . $_POST['pers_state'] . '</td></tr>';
                $message .= '<tr><td><strong>Country : </strong> </td><td>' . $_POST['pers_country'] . '</td></tr>';
                $message .= '<tr><td><strong>Phone : </strong> </td><td>' . $_POST['phone'] . '</td></tr>';

            $message .= '</table><br>';

            if( $_POST["pack_name"] != '' &&  $_POST["pack_address"] != '' && $_POST["pack_city"] != '' && $_POST["pack_zip"] != '' && $_POST["pack_country"] != '' )
            { 
                $message .= '<h4>Shipping address : </h4>';
                $message .= '<table rules="all" cellpadding="5">';

                    $message .= '<tr><td><strong>Full Name : </strong> </td><td>' . $_POST['pack_name'] . '</td></tr>';
                    $message .= '<tr><td><strong>Address : </strong> </td><td>' . $_POST['pack_address'] . '</td></tr>';
                    $message .= '<tr><td><strong>City : </strong> </td><td>' . $_POST['pack_city'] . '</td></tr>';
                    $message .= '<tr><td><strong>ZIP : </strong> </td><td>' . $_POST['pack_zip'] . '</td></tr>';
                    $message .= '<tr><td><strong>State : </strong> </td><td>' . $_POST['pack_state'] . '</td></tr>';
                    $message .= '<tr><td><strong>Country : </strong> </td><td>' . $_POST['pack_country'] . '</td></tr>';

                $message .= '</table><br>';
            }
            else
            {                
                $message .= '<p>No shipping data provided. Person data will be used for shipping info.</p>';
            }

            $message .= '<h4>Payment method : '. $_POST["payment_method"] .'</h4>';

            $message .= '<h4>Order : </h4>';
            $message .= '<table rules="all" cellpadding="5">';
                $message .= '<thead><th>Item code</th><th>Name</th><th>Quantity</th><th>Price</th></thead>';

                $total_cost = 0;
                foreach($_SESSION['cart'] as $item)
                {                               
                    $sub_total = $item['price'] * $item['qnt'];
                    $total_cost = $total_cost + $sub_total;
                    $message .= '<tr>';
                        $message .= '<td>' . $item['car_id'] .'-'. $item['num'] . '</td>';    
                        $message .= '<td>'. $item['name'] .'</td>';     
                        $message .= '<td>'. $item['qnt'] .'</td>';     
                        $message .= '<td>'. number_format((float)$sub_total, 2, '.', '') .'</td>';           
                    $message .= '</tr>';
                }
            $message .= '</table><br>';

            $message .= '<h4>Order Grand Total: EUR '. number_format((float)$total_cost, 2, '.', '') .'</h4>';

        $message .= '</body></html>';
        
        mail($mailTo, $subject, $message, stripcslashes($header)); 
    }
    
    function OwnerMail($mailTo, $mailFrom, $subject, $title, $order_id)
    {
        $header  = 'From: '. $mailFrom.'\r\n'; 
        $header .= 'MIME-Version: 1.0 \r\n'; 
        $header .= 'Content-Type: text/html; charset=utf-8'; 


        $message = '<html><body>';

            $message .= '<header>';
                $message .= '<h3>'. $title. '</h3>';
                $message .= '<h4>Order ID: '. $order_id .'</h4>';
                $message .= '<h4>Order date: '. date("Y-m-d H:i:s") .'</h4>';
            $message .= '</header>';

            $message .= '<h4>Customer info : </h4>';
                $message .= '<p>';
                    $message .= '<strong>Name : </strong>' . $_POST['pers_name'] .', '. $_POST['last_name'] . '<br>';
                    $message .= '<strong>E-mail : </strong>' . $_POST['e_mail'] . '<br>';
                    $message .= '<strong>Phone : </strong> ' . $_POST['phone'] . '<br>';
                    $message .= '<strong>From : </strong>' . $_POST['pers_country'] .' ( '. $_POST['pers_state'] .' ), '.  $_POST['pers_city'] .', '. $_POST['pers_address'] .' [ '. $_POST['pers_zip'] . ' ]<br>';
                    $message .= '<strong>Payment method : </strong>' . $_POST['payment_method'];
                $message .= '</p>';

                    
            if( $_POST["pack_name"] != '' &&  $_POST["pack_address"] != '' && $_POST["pack_city"] != '' && $_POST["pack_zip"] != '' && $_POST["pack_country"] != '' )
            { 
                
                $message .= '<p>An alternative shipping address WAS provided.</p>';
            }
            else
            {                
                $message .= '<p>An alternative shipping address WAS NOT provided</p>';
            }

            $message .= '<h4>Order : </h4>';
            $message .= '<table rules="all" cellpadding="1">';
                $message .= '<thead><th>Item code</th><th>Name</th><th>Quantity</th><th>Price</th></thead>';

                $total_cost = 0;
                foreach($_SESSION['cart'] as $item)
                {                               
                    $sub_total = $item['price'] * $item['qnt'];
                    $total_cost = $total_cost + $sub_total;
                    $message .= '<tr>';
                        $message .= '<td>' . $item['car_id'] .'-'. $item['num'] . '</td>';    
                        $message .= '<td>'. $item['name'] .'</td>';     
                        $message .= '<td>'. $item['qnt'] .'</td>';     
                        $message .= '<td>'. number_format((float)$sub_total, 2, '.', '') .'</td>';           
                    $message .= '</tr>';
                }
            $message .= '</table><br>';

            $message .= '<h4>Order Grand Total: EUR '. number_format((float)$total_cost, 2, '.', '') .'</h4>';

        $message .= '</body></html>';
        
        mail($mailTo, $subject, $message, stripcslashes($header)); 
    }
?>