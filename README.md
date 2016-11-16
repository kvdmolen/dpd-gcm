# GCM Push notifications for Deployd

## Install

	npm install dpd-gcm --save

## Configure

1. Read [https://developer.android.com/google/gcm/gs.html](https://developer.android.com/google/gcm/gs.html)
2. Create a GCM resource in Dashboard
3. Set your API key in Settings

## Usage

	dpd.resourcename.post(
		{
			message: "Your message here",
			devices: ["deviceID1","deviceID2", ...]
		},
		function(result, err){
		}
	)
