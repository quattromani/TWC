<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>
		
        <p class="subHead h6">Enter the ZIP Code or location of your service address below.</p>
        
		<div class="locate-stores">
			<form action="searchPage">		

				<div class="33-67 section columnControl">
					<div class="parsys_column twc-col2_3367">
						
						<div class="parsys parsys0 twc-col2_3367-c0 parsys_column">
							<div class="parbase section">		
								
								<!-- locate-stores input -->
								<div class="stores-find-me">
									<div class="twc-module">
										<fieldset class="twc-search">
											<div class="twc-search-input-wrap">
												<p class="light">Is this the ZIP Code for your service address?<br />If not, enter it now.</p>
												<input id="" type="search" placeholder="90064" name="">
												<div class="cta omega">
                                                    <a href="#" analyticsname="test">
                                                        <span>GO</span>
                                                    </a>
                                                </div>											
												<small>Enter ZIP Codes, or Street Address, City, State</small>
											</div>
                                            
                                            <div class="stores_details_map_info_distance twc-left">
                                                <span> WITHIN:</span>
                                                <select name="distance">
                                                    <option>40 Miles
                                                    <option>25 Miles
                                                    <option>10 Miles
                                                    <option>5 Miles
                                                </select>
                                            </div>
										</fieldset>
									</div>
								</div>
								<!-- .locate-stores input -->
							</div>
						</div>
					
						<div class="parsys parsys1 twc-col2_3367-c1 parsys_column">
							<div class="parbase section">
								
								<!-- locate stores filters -->
								<div class="locate-stores-filters">
									<fieldset>
										<legend class="light">Uncheck items below to remove from results</legend>
										<div class="filter-section">
											<div class="mobile-filters-options">
											    <div class="btn blue twc-left">
    											    <button type="submit">Apply Filters</button>
											    </div>
												<div class="btn blue twc-right">
    												<button type="clear">Reset Filters</button>
												</div>
											</div>
											
											<div class="25-50-25 section columnControl">
												<div class="parsys_column twc-col3_255025">
													<div class="parsys parsys0 twc-col3_255025-c0 parsys_column">
														<div class="parbase section filter-section-payment">
															<label for="payment">Payment Types</label>
															<ul class="filter-checkbox">
																<li><input id="icon-money" type="checkbox" checked name="" id=""><label>Cash<label></li>
																<li><input id="icon-list-alt" type="checkbox" checked name="" id=""><label>Check</label></li>
																<li><input id="icon-credit-card" type="checkbox" checked name="" id=""><label>Credit Card</label></li>
															</ul>
														</div>	
													</div>
													
													<div class="parsys parsys1 twc-col3_255025-c1 parsys_column">
														<div class="parbase section filter-section-services">
															<label for="services">Services Available</label>
                                                    			<div class="50-50 section columnControl">
                                                    				<div class="parsys_column twc-col2_5050">
                                                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                                                    						<div class="parbase section">
                                                                                <ul>
                                                                                    <li><input id="icon-eye-open" type="checkbox" checked name="" id=""><label>Demo Center</label></li>
                                                    								<li><input id="icon-wrench" type="checkbox" checked name="" id=""><label>Self Install</label></li>
                                                    								<li><input id="icon-dollar" type="checkbox" checked name="" id=""><label>Payment Centers</label></li>
                                                                                </ul>
                                                    						</div>
                                                    						<div class="new section"></div>
                                                    					</div>
                                                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                                                    						<div class="parbase section">
                                                                                <ul>
                                                                                    <li><input id="icon-time" type="checkbox" checked name="" id=""><label>24-Hour Payment</label></li>
                                                    								<li><input id="icon-download" type="checkbox" checked name="" id=""><label>Return Equipment</label></li>
                                                    								<li><input id="icon-exchange" type="checkbox" checked name=""><label>Exchange Equipment</label></li>
                                                                                </ul>
                                                    						</div>
                                                    						<div class="new section"></div>
                                                    					</div>
                                                    				</div>
                                                    				<div class="columnClear"></div>
                                                    			</div>
														</div>
													</div>	
													
													<div class="parsys parsys0 twc-col3_255025-c0 parsys_column">
														<div class="parbase section filter-section-office">
															<label for="office">Office</label>
															<ul>
																<li><input id="icon-building" type="checkbox" checked name="" id=""><label>TWC Office Only</label></li>
																<li><input id="icon-shopping-cart" type="checkbox" checked name="" id=""><label>Retail Stores</label></li>
															</ul>
														</div>
													</div>	
												</div>
											</div>
										</div>
									</fieldset>

								</div>
								<!-- .locate stores filters -->
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
            	
		<div class="map-stores twc-box-column">
			
			<header class="page-header">
				<div class="tabs">
					<ul>
						<li class="h5 stores_list_tab"><a href="#stores_map_details">List</a></li>
						<li class="h5 stores_map_tab"><a href="#stores_map_map">Map</a></li>
					</ul>
				</div>
			</header>
			
			<div class="cap"></div>
						
			<div class="stores_details_map_container">
				<div class="stores_details_map_info">
					<span class="h5">Currently showing (4) locations near Birmingham, AL</span>
					
					<div class="right">
        				<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/share.php'); ?>
        			</div>
				</div>
				
				<div class="parsys_column twc-col2_3367-c0 stores_location_details" id="stores_map_details">
					
					<div class="stores_locations_details_legend">
						<div class="legend_icons">
                            <div class="50-50 section columnControl">
                				<div class="parsys_column twc-col2_5050">
                					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                						<div class="parbase section">
                							<ul>
                    							<li><span class="icon-money"></span>Cash</li>
                    							<li><span class="icon-list-alt"></span>Check</li>
                    							<li><span class="icon-credit-card"></span>Credit Card</li>
                    							<li><span class="icon-eye-open"></span>Demo Center</li>
                    							<li><span class="icon-wrench"></span>Self Install</li>
                    							<li><span class="icon-dollar"></span>Payment Center</li>
                							</ul>
                						</div>
                						<div class="new section"></div>
                					</div>
                					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                						<div class="parbase section">
                							<ul>
                    							<li><span class="icon-time"></span>24-Hour Payment</li>
                    							<li><span class="icon-download"></span>Return Equipment</li>
                    							<li><span class="icon-exchange"></span>Exchange Equipment</li>
                    							<li><span class="icon-building"></span>TWC Office Only</li>
                    							<li><span class="icon-shopping-cart"></span>Retail Store</li>
                                                <li><span class="icon-flag red-icon"></span>New Store</li>
                							</ul>
                						</div>
                						<div class="new section"></div>
                					</div>
                				</div>
                				<div class="columnClear"></div>
                			</div>
                        </div>
						<div class="legend_note">
							<p><b>NOTE:</b> Not all stores will exchange equipment; please check the details of each location.</p>
						</div>
					</div>
					
					<div class="location_listing vertical lined alt">
						<ul id="paymentcenterresults">
							<li id="outputDiv0" class="outputdiv 2666">
								
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">                                                  
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>                    								
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <div class="pType icon-wrench"></div>
                                                <div class="pType icon-time"></div>
                                                <div class="pType icon-eye-open"></div>
                                                <div class="pType icon-exchange"></div>
                                                <div class="pType icon-flag red-icon"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="bulleted">
                                                	<ul>
                                                    	<li class="service_selfinstall">Self Install</li>
                                                        <li class="service_alldaypayment">24-Hour Payment</li>
                                                        <li class="service_democenter">Demo Center</li>
                                                        <li class="service_newequipment">New Equipment</li>
                                                        <li class="service_boxswap">Box Swap</li>
                                                        <li class="service_setup">Setup</li>
                                                        <li class="service_setup">Equipment Exchanges</li>
                                                    </ul>
                                                    
                                             	</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
							<li id="outputDiv0" class="outputdiv 2666">
								
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">                                                  
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>                    								
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <div class="pType icon-wrench"></div>
                                                <div class="pType icon-time"></div>
                                                <div class="pType icon-eye-open"></div>
                                                <div class="pType icon-exchange"></div>
                                                <div class="pType icon-flag red-icon"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="bulleted">
                                                	<ul>
                                                    	<li class="service_selfinstall">Self Install</li>
                                                        <li class="service_alldaypayment">24-Hour Payment</li>
                                                        <li class="service_democenter">Demo Center</li>
                                                        <li class="service_newequipment">New Equipment</li>
                                                        <li class="service_boxswap">Box Swap</li>
                                                        <li class="service_setup">Setup</li>
                                                        <li class="service_setup">Equipment Exchanges</li>
                                                    </ul>
                                                    
                                             	</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
                            <li id="outputDiv0" class="outputdiv 2666">
								
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">                                                  
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>                    								
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <div class="pType icon-wrench"></div>
                                                <div class="pType icon-time"></div>
                                                <div class="pType icon-eye-open"></div>
                                                <div class="pType icon-exchange"></div>
                                                <div class="pType icon-flag red-icon"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="bulleted">
                                                	<ul>
                                                    	<li class="service_selfinstall">Self Install</li>
                                                        <li class="service_alldaypayment">24-Hour Payment</li>
                                                        <li class="service_democenter">Demo Center</li>
                                                        <li class="service_newequipment">New Equipment</li>
                                                        <li class="service_boxswap">Box Swap</li>
                                                        <li class="service_setup">Setup</li>
                                                        <li class="service_setup">Equipment Exchanges</li>
                                                    </ul>
                                                    
                                             	</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
                            <li id="outputDiv0" class="outputdiv 2666">
								
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">                                                  
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>                    								
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <div class="pType icon-wrench"></div>
                                                <div class="pType icon-time"></div>
                                                <div class="pType icon-eye-open"></div>
                                                <div class="pType icon-exchange"></div>
                                                <div class="pType icon-flag red-icon"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="bulleted">
                                                	<ul>
                                                    	<li class="service_selfinstall">Self Install</li>
                                                        <li class="service_alldaypayment">24-Hour Payment</li>
                                                        <li class="service_democenter">Demo Center</li>
                                                        <li class="service_newequipment">New Equipment</li>
                                                        <li class="service_boxswap">Box Swap</li>
                                                        <li class="service_setup">Setup</li>
                                                        <li class="service_setup">Equipment Exchanges</li>
                                                    </ul>
                                                    
                                             	</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
                            <li id="outputDiv0" class="outputdiv 2666">
								
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">                                                  
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>                    								
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <div class="pType icon-wrench"></div>
                                                <div class="pType icon-time"></div>
                                                <div class="pType icon-eye-open"></div>
                                                <div class="pType icon-exchange"></div>
                                                <div class="pType icon-flag red-icon"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="bulleted">
                                                	<ul>
                                                    	<li class="service_selfinstall">Self Install</li>
                                                        <li class="service_alldaypayment">24-Hour Payment</li>
                                                        <li class="service_democenter">Demo Center</li>
                                                        <li class="service_newequipment">New Equipment</li>
                                                        <li class="service_boxswap">Box Swap</li>
                                                        <li class="service_setup">Setup</li>
                                                        <li class="service_setup">Equipment Exchanges</li>
                                                    </ul>
                                                    
                                             	</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
						</ul>
					</div>

				</div>
	
				<div class="twc-col2_3367-c1 stores_map" id="stores_map_map">
					<div id="map-canvas"></div>
				</div>
			</div>
			
		</div>
        
        <div class="map-stores twc-box-column">
			
			<header class="page-header">
				<div class="tabs">
					<ul>
						<li class="h5 stores_list_tab"><a href="#stores_map_details">List</a></li>
						<li class="h5 stores_map_tab"><a href="#stores_map_map">Map</a></li>
					</ul>
				</div>
			</header>
            			
			<div class="stores_details_map_container">
				<div class="stores_details_map_info">
					<span class="h5">Currently showing (0) locations near Birmingham, AL</span>
					
					<!-- SHARE Module -->
        			<div class="share twc-right">
        				<!-- Print / Email Component -->
        				<div class="share-emailPrint">
        				    <div class="btn blue share">
            				    <button id="print" onClick="window.print()">
        							<span class="icon-print"></span><span class="text">PRINT</span>
                                </button>    
        				    </div>
        
        					<div class="btn blue share">
        					    <button id="email">
        							<span class="icon-envelope-alt"></span><span class="text">EMAIL</span>
                                </button>
        					</div>
        				</div>
        				<!-- .Print / Email Component -->
        				
        				<!-- Email Module -->			
        				<div class="email-module">
        					<div class="close"></div>
        					<b>Enter Your Email Address</b>
        					<form>
        						<div class="formrow">
        							<div class="form-item">
        								<label for="email">Your Email Address:</label>
        								<input id="email_addr" type="email" autocomplete="email" name="email">
        							</div>
        						</div>
        						
        						<div class="formrow">
        							<div class="form-item">
        								<label for="send">Send To:</label>
        								<input id="to_email_addr" type="text" name="to_email">
        							</div>
        						</div>
        						
        						<div class="formrow">
        							<div class="form-item">
        								<label for="text">Add Note:</label>
        								<textarea>
        								</textarea>
        							</div>
        						</div>
        						
        						<div class="formrow">
        							<div class="form-item">
        							    <div class="btn blue">
        								    <button type="submit">Send</button>
        							    </div>
        							</div>
        						</div>
        					</form>
        				</div>
        				<!-- .Email Module -->
        			</div>
        			<!-- .SHARE Module -->
        							
				</div>
				
				<div class="parsys_column twc-col2_3367-c0 stores_location_details" id="stores_map_details">
					
					<div class="stores_locations_details_legend">
						<div class="legend_icons">
                            <div class="50-50 section columnControl">
                				<div class="parsys_column twc-col2_5050">
                					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                						<div class="parbase section">
                							<ul>
                    							<li><span class="icon-money"></span>Cash</li>
                    							<li><span class="icon-list-alt"></span>Check</li>
                    							<li><span class="icon-credit-card"></span>Credit Card</li>
                    							<li><span class="icon-eye-open"></span>Demo Center</li>
                    							<li><span class="icon-wrench"></span>Self Install</li>
                    							<li><span class="icon-dollar"></span>Payment Center</li>
                							</ul>
                						</div>
                						<div class="new section"></div>
                					</div>
                					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                						<div class="parbase section">
                							<ul>
                    							<li><span class="icon-time"></span>24-Hour Payment</li>
                    							<li><span class="icon-download"></span>Return Equipment</li>
                    							<li class="muted"><span class="icon-exchange"></span>Exchange Equipment</li>
                    							<li><span class="icon-building"></span>TWC Office Only</li>
                    							<li><span class="icon-shopping-cart"></span>Retail Store</li>
                                                <li><span class="icon-flag red-icon"></span>New Store</li>
                							</ul>
                						</div>
                						<div class="new section"></div>
                					</div>
                				</div>
                				<div class="columnClear"></div>
                			</div>
                        </div>
						<div class="legend_note">
							<p><b>NOTE:</b> Not all stores will exchange equipment; please check the details of each location.</p>
						</div>
					</div>

				</div>
	
				<div class="twc-col2_3367-c1 stores_map" id="stores_map_map">
					<p class="error"><span class="twc-icon icon-exclamation-sign"></span> No locations found near address. Please try entering a different address.</p>
				</div>
			</div>
			
		</div>
		
<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>